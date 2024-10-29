// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/Test.sol";
import {JackRampDeploymentLib} from "./utils/JackRampDeploymentLib.sol";
import {CoreDeploymentLib} from "./utils/CoreDeploymentLib.sol";
import {UpgradeableProxyLib} from "./utils/UpgradeableProxyLib.sol";
import {StrategyBase} from "@eigenlayer/contracts/strategies/StrategyBase.sol";
import {ERC20Mock} from "../test/ERC20Mock.sol";
import {M0Mock} from "../test/M0Mock.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";

import {Quorum, StrategyParams, IStrategy} from "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistryEventsAndErrors.sol";

contract JackRampDeployer is Script {
    using CoreDeploymentLib for *;
    using UpgradeableProxyLib for address;

    address private deployer;
    address proxyAdmin;
    IStrategy jackRampStrategy;
    CoreDeploymentLib.DeploymentData coreDeployment;
    JackRampDeploymentLib.DeploymentData jackRampDeployment;
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
        underToken = new M0Mock();
        token = new ERC20Mock();
        jackRampStrategy = IStrategy(
            StrategyFactory(coreDeployment.strategyFactory).deployNewStrategy(
                token
            )
        );

        quorum.strategies.push(
            StrategyParams({strategy: jackRampStrategy, multiplier: 10_000})
        );
    }

    function run() external {
        vm.startBroadcast(deployer);
        proxyAdmin = UpgradeableProxyLib.deployProxyAdmin();
        jackRampDeployment = JackRampDeploymentLib.deployContracts(
            proxyAdmin,
            coreDeployment,
            quorum,
            address(underToken)
        );

        jackRampDeployment.strategy = address(jackRampStrategy);
        jackRampDeployment.token = address(token);
        vm.stopBroadcast();

        verifyDeployment();
        JackRampDeploymentLib.writeDeploymentJson(jackRampDeployment);
    }

    function verifyDeployment() internal view {
        require(
            jackRampDeployment.stakeRegistry != address(0),
            "StakeRegistry address cannot be zero"
        );
        require(
            jackRampDeployment.jackRampServiceManager != address(0),
            "JackRampServiceManager address cannot be zero"
        );
        require(
            jackRampDeployment.strategy != address(0),
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
