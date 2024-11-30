// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/Test.sol";
import {EnaRampDeploymentLib} from "./utils/EnaRampDeploymentLib.sol";
import {CoreDeploymentLib} from "./utils/CoreDeploymentLib.sol";
import {UpgradeableProxyLib} from "./utils/UpgradeableProxyLib.sol";
import {StrategyBase} from "@eigenlayer/contracts/strategies/StrategyBase.sol";
import {ERC20Mock} from "../test/ERC20mock.sol";
import {M0Mock} from "../test/M0Mock.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";

import {Quorum, StrategyParams, IStrategy} from "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistryEventsAndErrors.sol";

contract EnaRampDeployer is Script {
    using CoreDeploymentLib for *;
    using UpgradeableProxyLib for address;

    address private deployer;
    address proxyAdmin;
    IStrategy enaRampStrategy;
    CoreDeploymentLib.DeploymentData coreDeployment;
    EnaRampDeploymentLib.DeploymentData enaRampDeployment;
    Quorum internal quorum;
    ERC20Mock token;
    M0Mock underToken;

    function setUp() public virtual {
        deployer = vm.rememberKey(vm.envUint("PRIVATE_KEY"));
        vm.label(deployer, "Deployer");

        coreDeployment = CoreDeploymentLib.readDeploymentJson(
            "deployments/core/",
            block.chainid
        );
        token = new ERC20Mock();
        enaRampStrategy = IStrategy(
            StrategyFactory(coreDeployment.strategyFactory).deployNewStrategy(
                token
            )
        );

        quorum.strategies.push(
            StrategyParams({strategy: enaRampStrategy, multiplier: 10_000})
        );
    }

    function run() external {
        vm.startBroadcast(deployer);
        //underToken = new M0Mock();
        proxyAdmin = UpgradeableProxyLib.deployProxyAdmin();
        enaRampDeployment = EnaRampDeploymentLib.deployContracts(
            proxyAdmin,
            coreDeployment,
            quorum,
            address(0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE) //address(underToken)
        );

        enaRampDeployment.strategy = address(enaRampStrategy);
        enaRampDeployment.token = address(token);
        enaRampDeployment
            .underlyingUSD = address(0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE); //address(underToken);
        vm.stopBroadcast();

        verifyDeployment();
        EnaRampDeploymentLib.writeDeploymentJson(enaRampDeployment);
    }

    function verifyDeployment() internal view {
        require(
            enaRampDeployment.stakeRegistry != address(0),
            "StakeRegistry address cannot be zero"
        );
        require(
            enaRampDeployment.enaRampServiceManager != address(0),
            "EnaRampServiceManager address cannot be zero"
        );
        require(
            enaRampDeployment.strategy != address(0),
            "Strategy address cannot be zero"
        );
        require(proxyAdmin != address(0), "ProxyAdmin address cannot be zero");
        require(
            coreDeployment.delegationManager != address(0),
            "DelegationManager address cannot be zero"
        );
        require(
            coreDeployment.avsDirectory != address(0),
            "AVSDirectory address cannot be zero"
        );
    }
}
