## JACKRAMP AVS Contracts

## How to run
Navigate to folder `contracts`
```shell
cd contracts
```


### Build

```shell
$ forge build
```

### Deploy Eigen

```shell
$ forge script script/DeployEigenLayerCore.s.sol --rpc-url <RPC_URL> --broadcast
```

### Deploy Jackramp

```shell
$ forge script script/JackRampDeployer.s.sol --rpc-url  <RPC_URL> --broadcast
```


## 📧 Documentation

For more detailed documentation, please refer to the following [Gitbook link](https://kbaji.gitbook.io/jackramp-avs).

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
