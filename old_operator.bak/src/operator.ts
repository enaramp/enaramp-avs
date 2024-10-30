import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {
  createPublicClient,
  createWalletClient,
  encodeAbiParameters,
  encodeFunctionData,
  getContract,
  hexToBigInt,
  hexToNumber,
  http,
  keccak256,
  parseAbiItem,
  parseAbiParameters,
  stringToBytes,
  stringToHex,
  toBytes,
  zeroAddress,
} from "viem";
import { privateKeyToAccount, signMessage } from "viem/accounts";
import { anvil, holesky } from "viem/chains";
import { ethers } from ".pnpm/ethers@6.13.4/node_modules/ethers/lib.commonjs";
import {
  ecdsaStakeRegistryAbi,
  iavsDirectoryAbi,
  iDelegationManagerAbi,
  jackRampServiceManagerAbi,
} from "./generated";

dotenv.config();
import { ReclaimClient } from ".pnpm/@reclaimprotocol+zk-fetch@0.2.0/node_modules/@reclaimprotocol/zk-fetch/dist";

const client = new ReclaimClient(
  "0x0bDc0951C24f5D3e92DDdF98ff5399BeEB8391f6",
  "0x62ced9f436119a32e9b1db561b99971969401f0ba3e0c3eedfad6262724b7d6a"
);

// Check if the process.env object is empty
if (!Object.keys(process.env).length) {
  throw new Error("process.env object is empty");
}

const account = privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`);
// Setup env variables
const wallet = createWalletClient({
  transport: http(process.env.RPC_URL!),
  chain: holesky,
  account,
});

const publicClient = createPublicClient({
  transport: http(process.env.RPC_URL!),
  chain: holesky,
});

let chainId = holesky.id;

const avsDeploymentData = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      `../../contracts/deployments/jackramp/${chainId}.json`
    ),
    "utf8"
  )
);
// Load core deployment data
const coreDeploymentData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, `../../contracts/deployments/core/${chainId}.json`),
    "utf8"
  )
);

const delegationManagerAddress = coreDeploymentData.addresses.delegation; // todo: reminder to fix the naming of this contract in the deployment file, change to delegationManager
const avsDirectoryAddress = coreDeploymentData.addresses.avsDirectory;
const jackrampServiceManagerAddress =
  avsDeploymentData.addresses.jackRampServiceManager;
const ecdsaStakeRegistryAddress = avsDeploymentData.addresses.stakeRegistry;

// Initialize contract objects from ABIs
const delegationManager = getContract({
  abi: iDelegationManagerAbi,
  address: delegationManagerAddress,
  client: wallet,
});

const JackRampServiceManager = getContract({
  abi: jackRampServiceManagerAbi,
  address: jackrampServiceManagerAddress,
  client: wallet,
});
const ecdsaRegistryContract = getContract({
  abi: ecdsaStakeRegistryAbi,
  address: ecdsaStakeRegistryAddress,
  client: wallet,
});

const avsDirectory = getContract({
  abi: iavsDirectoryAbi,
  address: avsDirectoryAddress,
  client: wallet,
});

const signAndRespondToTask = async (taskIndex: number, task: Task) => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const messageHash = ethers.solidityPackedKeccak256(["uint32"], [taskIndex]);
  const messageBytes = ethers.getBytes(messageHash);
  const signature = await wallet.signMessage(messageBytes);

  console.log(`Signing and responding to task ${taskIndex}`);

  const operators = [await wallet.getAddress()];
  const signatures = [signature];

  const signedTask = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address[]", "bytes[]", "uint32"],
    [operators, signatures, ethers.toBigInt(await provider.getBlockNumber())]
  );

  const params: Task = {
    channelId: task.channelId,
    transactionId: task.transactionId,
    requestOfframpId: task.requestOfframpId,
    receiver: task.receiver,
    taskCreatedBlock: task.taskCreatedBlock,
  };

  const jackRampServiceManagerAddress =
    avsDeploymentData.addresses.jackRampServiceManager;
  const jackRampServiceManagerABI = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../abis/JackRampServiceManager.json"),
      "utf8"
    )
  );

  const jackRampServiceManager = new ethers.Contract(
    jackRampServiceManagerAddress,
    jackRampServiceManagerABI,
    wallet
  );

  const tx = await jackRampServiceManager.completeOfframp(
    params,
    taskIndex,
    signedTask
  );

  const receipt = await tx.wait();

  console.log(`Transaction hash: ${receipt.transactionHash}`);

  const publicOptions = {
    method: "POST", // or POST
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer Test",
    },
  };

  const proof = await client.zkFetch(
    "https://mock.blocknaut.xyz/generateTransferProof",
    publicOptions
  );

  // console.log(proof);

  // const tx = await helloWorldServiceManager.simulate.completeOfframp(
  //   [
  //     {
  //       channelId: task.channelId,
  //       receiver: task.receiver as `0x${string}`,
  //       requestOfframpId: task.requestOfframpId as `0x${string}`,
  //       taskCreatedBlock: task.taskCreatedBlock,
  //       transactionId: task.transactionId,
  //     },
  //     taskIndex,
  //     signedTask,
  //   ],
  //   {
  //     account: account,
  //   }
  // );

  // const request = await wallet.prepareTransactionRequest({
  //   to: JackRampServiceManager.address,
  //   data: encodeFunctionData({
  //     abi: JackRampServiceManager.abi,
  //     functionName: "completeOfframp",
  //     args: [
  //       {
  //         channelId: task.channelId,
  //         receiver: task.receiver as `0x${string}`,
  //         requestOfframpId: task.requestOfframpId as `0x${string}`,
  //         taskCreatedBlock: task.taskCreatedBlock,
  //         transactionId: task.transactionId,
  //       },
  //       taskIndex,
  //       signedTask,
  //     ],
  //   }),
  // });

  // const serializedTx = await wallet.signTransaction(request);

  // const tx = await wallet.sendRawTransaction({
  //   serializedTransaction: serializedTx,
  // });

  // console.log(`Transaction hash: ${tx.hash}`);

  console.log(`Responded to task.`);
};

const registerOperator = async () => {
  try {
    const tx1 = await delegationManager.write.registerAsOperator(
      [
        {
          __deprecated_earningsReceiver: account.address,
          delegationApprover: "0x0000000000000000000000000000000000000000",
          stakerOptOutWindowBlocks: 0,
        },
        "",
      ],
      {
        account: account,
      }
    );

    console.log(tx1);
    console.log("Operator registered to Core EigenLayer contracts");
  } catch (error) {
    console.error("Error in registering as operator:", error);
  }

  const salt = ethers.hexlify(ethers.randomBytes(32));
  const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now

  // Define the output structure
  let operatorSignatureWithSaltAndExpiry = {
    signature: "",
    salt: salt,
    expiry: expiry,
  };

  //   {
  //     "name": "operator",
  //     "type": "address",
  //     "internalType": "address"
  //   },
  //   {
  //     "name": "avs",
  //     "type": "address",
  //     "internalType": "address"
  //   },
  //   {
  //     "name": "salt",
  //     "type": "bytes32",
  //     "internalType": "bytes32"
  //   },
  //   {
  //     "name": "expiry",
  //     "type": "uint256",
  //     "internalType": "uint256"
  //   }
  // Calculate the digest hash, which is a unique value representing the operator, avs, unique value (salt) and expiration date.
  const operatorDigestHash =
    await avsDirectory.read.calculateOperatorAVSRegistrationDigestHash(
      [
        account.address,
        ecdsaStakeRegistryAddress,
        operatorSignatureWithSaltAndExpiry.salt as `0x${string}`,
        BigInt(operatorSignatureWithSaltAndExpiry.expiry),
      ],
      {
        account: account,
      }
    );
  console.log(operatorDigestHash);

  // Sign the digest hash with the operator's private key
  console.log("Signing digest hash with operator's private key");
  const operatorSigningKey = new ethers.SigningKey(process.env.PRIVATE_KEY!);
  const operatorSignedDigestHash = operatorSigningKey.sign(operatorDigestHash);

  // Encode the signature in the required format
  operatorSignatureWithSaltAndExpiry.signature = ethers.Signature.from(
    operatorSignedDigestHash
  ).serialized;

  console.log("Registering Operator to AVS Registry contract");

  // Register Operator to AVS
  // Per release here: https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.1-mainnet-rewards/src/unaudited/ECDSAStakeRegistry.sol#L49
  //   {
  //     "name": "_operatorSignature",
  //     "type": "tuple",
  //     "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
  //     "components": [
  //       {
  //         "name": "signature",
  //         "type": "bytes",
  //         "internalType": "bytes"
  //       },
  //       {
  //         "name": "salt",
  //         "type": "bytes32",
  //         "internalType": "bytes32"
  //       },
  //       {
  //         "name": "expiry",
  //         "type": "uint256",
  //         "internalType": "uint256"
  //       }
  //     ]
  //   },
  //   {
  //     "name": "_signingKey",
  //     "type": "address",
  //     "internalType": "address"
  //   }
  const tx2 = await ecdsaRegistryContract.write.registerOperatorWithSignature(
    [
      {
        signature: "" as `0x${string}`,
        salt: operatorSignatureWithSaltAndExpiry.salt as `0x${string}`,
        expiry: BigInt(operatorSignatureWithSaltAndExpiry.expiry),
      },
      account.address,
    ],
    {
      account: account,
    }
  );
  console.log("Operator registered on AVS successfully");
};

export type Task = {
  channelId: string;
  transactionId: string;
  requestOfframpId: string;
  receiver: string;
  taskCreatedBlock: number;
};

const monitorNewTasks = async () => {
  //console.log(`Creating new task "EigenWorld"`);
  // await helloWorldServiceManager.createNewTask("EigenWorld");

  // publicClient.watchContractEvent({
  //   abi: helloWorldServiceManager.abi,
  //   address: helloWorldServiceManager.address,
  //   eventName: "NewTaskCreated",
  //   fromBlock: await publicClient.getBlockNumber(),
  //   // struct Task {
  //   //     string channelId;
  //   //     string transactionId;
  //   //     bytes32 requestOfframpId;
  //   //     address receiver;
  //   //     uint32 taskCreatedBlock;
  //   // }
  //   onLogs: async (logs) => {
  //     for (const log of logs) {
  //       // Extract taskIndex and task data from the log arguments
  //       console.log(log.args);

  // console.log(`Random: ${amount} ${channelId} ${channelAccount} ${transactionId}`);

  const { taskIndex, task } = {
    taskIndex: 1,
    task: {
      channelId: "bni",
      transactionId: "124",
      requestOfframpId:
        "0x9b147dd695234d69a9ecf40c32ea7d0b2f60852d2d439bd966b420d8d78d86c2",
      receiver: "0x6d65D81E03C3D57402ab1AAFECD25bc59362022a",
      taskCreatedBlock: 2631698,
    },
  };

  const newTask = task as Task;

  const taskData = {
    channelId: newTask.channelId,
    transactionId: newTask.transactionId,
    requestOfframpId: newTask.requestOfframpId,
    receiver: newTask.receiver,
    taskCreatedBlock: newTask.taskCreatedBlock,
  };

  await signAndRespondToTask(taskIndex as number, taskData);

  //       console.log(`Task Index: ${taskIndex}`, taskData);
  //     }
  //   },
  // });

  console.log("Monitoring for new tasks...");
};

const main = async () => {
  // await registerOperator();
  monitorNewTasks().catch((error) => {
    console.error("Error monitoring tasks:", error);
  });
};

main().catch((error) => {
  console.error("Error in main function:", error);
});
