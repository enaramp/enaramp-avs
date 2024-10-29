import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {
  createPublicClient,
  createWalletClient,
  encodeAbiParameters,
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
import { anvil } from "viem/chains";
import { ethers } from "ethers";
import {
  ecdsaStakeRegistryAbi,
  iavsDirectoryAbi,
  iDelegationManagerAbi,
  jackRampServiceManagerAbi,
} from "./generated";
import { waitForTransactionReceipt } from "viem/actions";

dotenv.config();

// Check if the process.env object is empty
if (!Object.keys(process.env).length) {
  throw new Error("process.env object is empty");
}

const account = privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`);
// Setup env variables
const wallet = createWalletClient({
  transport: http(process.env.RPC_URL!),
  chain: anvil,
  account,
});

const publicClient = createPublicClient({
  transport: http(process.env.RPC_URL!),
  chain: anvil,
});

let chainId = 31337;

const avsDeploymentData = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      `../contracts/deployments/hello-world/${chainId}.json`
    ),
    "utf8"
  )
);
// Load core deployment data
const coreDeploymentData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, `../contracts/deployments/core/${chainId}.json`),
    "utf8"
  )
);

const delegationManagerAddress = coreDeploymentData.addresses.delegation; // todo: reminder to fix the naming of this contract in the deployment file, change to delegationManager
const avsDirectoryAddress = coreDeploymentData.addresses.avsDirectory;
const helloWorldServiceManagerAddress =
  avsDeploymentData.addresses.helloWorldServiceManager;
const ecdsaStakeRegistryAddress = avsDeploymentData.addresses.stakeRegistry;

// Initialize contract objects from ABIs
const delegationManager = getContract({
  abi: iDelegationManagerAbi,
  address: delegationManagerAddress,
  client: wallet,
});

const helloWorldServiceManager = getContract({
  abi: jackRampServiceManagerAbi,
  address: helloWorldServiceManagerAddress,
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
  const message = `Task ${taskIndex} completed`;
  const messageHash = keccak256(toBytes(message));
  const signature = await signMessage({
    message: messageHash,
    privateKey: process.env.PRIVATE_KEY! as `0x${string}`,
  });

  console.log(`Signing and responding to task ${taskIndex}`);

  const operators = [account.address];
  const signatures = [signature];

  const signedTask = encodeAbiParameters(
    parseAbiParameters(["address[]", "bytes[]", "uint32"]),
    [operators, signatures, hexToNumber(account.address)]
  );

  const tx = await helloWorldServiceManager.write.completeOfframp(
    [
      {
        channelId: task.channelId,
        receiver: stringToHex(task.receiver),
        requestOfframpId: stringToHex(task.requestOfframpId),
        taskCreatedBlock: task.taskCreatedBlock,
        transactionId: task.transactionId,
      },
      taskIndex,
      signedTask,
    ],
    {
      account: account,
    }
  );

  console.log(`Responded to task.`);
};

const registerOperator = async () => {
  // Registers as an Operator in EigenLayer.
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
        signature:
          operatorSignatureWithSaltAndExpiry.signature as `0x${string}`,
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

  publicClient.watchEvent({
    event: parseAbiItem(
      "event NewTaskCreated(uint32 indexed taskIndex, Task task)"
    ),
    fromBlock: await publicClient.getBlockNumber(),
    // struct Task {
    //     string channelId;
    //     string transactionId;
    //     bytes32 requestOfframpId;
    //     address receiver;
    //     uint32 taskCreatedBlock;
    // }
    onLogs: async (logs) => {
      for (const log of logs) {
        // Extract taskIndex and task data from the log arguments
        const { taskIndex, task } = log.args;

        const newTask = task as Task;

        const taskData = {
          channelId: newTask.channelId,
          transactionId: newTask.transactionId,
          requestOfframpId: newTask.requestOfframpId,
          receiver: newTask.receiver,
          taskCreatedBlock: newTask.taskCreatedBlock,
        };

        await signAndRespondToTask(taskIndex as number, taskData);

        console.log(`Task Index: ${taskIndex}`, taskData);
      }
    },
  });

  console.log("Monitoring for new tasks...");
};

const main = async () => {
  await registerOperator();
  monitorNewTasks().catch((error) => {
    console.error("Error monitoring tasks:", error);
  });
};

main().catch((error) => {
  console.error("Error in main function:", error);
});
