import { ethers, Contract, Wallet, JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";

dotenv.config();

// Setup environment variables and types
const provider: JsonRpcProvider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);
const wallet: Wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const userWallet: Wallet = new ethers.Wallet(
  process.env.USER_PRIVATE_KEY!,
  provider
);

const chainId: number = 52085143; // TODO: Hack

// Define interfaces
interface DeploymentData {
  addresses: {
    enaRampServiceManager: string;
    underlyingUSD: string; // Replace with USDe address if different
    USDe: string; // Add USDe address here
  };
}

interface OfframpRequestParams {
  user: string;
  amount: bigint;
  amountRealWorld: bigint;
  channelAccount: string;
  channelId: string;
}

// Read deployment data with proper typing
const avsDeploymentData: DeploymentData = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      `../../contracts/deployments/jackramp/${chainId}.json`
    ),
    "utf8"
  )
);

const enaRampServiceManagerAddress: string =
  avsDeploymentData.addresses.enaRampServiceManager;
const USDeAddress: string = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE"; // USDe address

const enaRampServiceManagerABI = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../abis/EnaRampServiceManager.json"),
    "utf8"
  )
);
const USDeABI = JSON.parse( // Replace ABI with USDe ABI
  fs.readFileSync(path.resolve(__dirname, "../../abis/USDe.json"), "utf8")
);

// Initialize contract objects
const enaRampServiceManagerFromUser: Contract = new ethers.Contract(
  enaRampServiceManagerAddress,
  enaRampServiceManagerABI,
  userWallet
);
const enaRampServiceManager: Contract = new ethers.Contract(
  enaRampServiceManagerAddress,
  enaRampServiceManagerABI,
  wallet
);
const USDe: Contract = new ethers.Contract( // Initialize USDe contract
  USDeAddress,
  USDeABI,
  userWallet
);

let currentData: [bigint, string, string, string];

// ASCII banner with figlet
console.log(
  chalk.green(figlet.textSync("Enaramp CLI", { horizontalLayout: "fitted" }))
);

// Helper function for hashing
function hashIt(content: string): string {
  const hexi: Uint8Array = ethers.toUtf8Bytes(content);
  return ethers.keccak256(hexi);
}

// Generate random task data
function generateRandomData(): [bigint, string, string, string] {
  const amounts: bigint[] = [
    BigInt(1000000),
    BigInt(2000000),
    BigInt(3000000),
    BigInt(1000000),
    BigInt(2000000),
    BigInt(1500000),
  ];
  const channelIds: string[] = [
    "bca",
    "mandiri",
    "bni",
    "bca",
    "bni",
    "mandiri",
  ];
  const channelAccounts: string[] = [
    "111111",
    "222222",
    "333333",
    "444444",
    "343434",
    "78989",
  ];
  const transactionIds: string[] = ["121", "122", "123", "124", "125", "126"];

  const index = Math.floor(Math.random() * amounts.length);
  return [
    amounts[index],
    channelIds[index],
    channelAccounts[index],
    transactionIds[index],
  ];
}

// Create a new task
async function createNewTask(
  amount: bigint,
  channelId: string,
  channelAccount: string,
  transactionId: string
): Promise<void> {
  console.log(chalk.blue(`⚙️ Creating Task with:`));
  console.log(chalk.magenta(`🔢 Amount: ${amount}`));
  console.log(chalk.magenta(`🏦 ChannelId: ${channelId}`));
  console.log(chalk.magenta(`📞 ChannelAccount: ${channelAccount}`));

  const spinner = ora(chalk.cyan("Starting App..")).start();

  // try {
  //   const txMint = await USDe.mint(userWallet.address, amount); // Mint USDe instead of mockUSD
  //   const receiptMint = await txMint.wait();
  //   spinner.succeed(
  //     chalk.green(`✅ Minted USDe! Tx Hash: ${receiptMint.hash}`)
  //   );
  // } catch (error) {
  //   spinner.fail(chalk.red("❌ Error minting USDe: " + (error as Error).message));
  //   console.log(error);
  //   return;
  // }

  spinner.start(chalk.cyan("Approving USDe..."));

  try {
    const txApprove = await USDe.approve( // Approve USDe instead of mockUSD
      enaRampServiceManagerAddress,
      amount
    );
    const receiptApprove = await txApprove.wait();
    spinner.succeed(
      chalk.green(`✅ Approved USDe! Tx Hash: ${receiptApprove.hash}`)
    );
  } catch (error) {
    spinner.fail(
      chalk.red("❌ Error approving USDe: " + (error as Error).message)
    );
    return;
  }

  spinner.start(chalk.cyan("Minting enaUSD..."));

  try {
    const txMintEna = await enaRampServiceManagerFromUser.mint(amount);
    const receiptMintEna = await txMintEna.wait();
    spinner.succeed(
      chalk.green(`✅ Minted enaUSD! Tx Hash: ${receiptMintEna.hash}`)
    );
  } catch (error) {
    spinner.fail(
      chalk.red("❌ Error minting enaUSD: " + (error as Error).message)
    );
    return;
  }

  spinner.start(chalk.cyan("Requesting Offramp..."));

  try {
    const params: OfframpRequestParams = {
      user: userWallet.address,
      amount: amount,
      amountRealWorld: amount,
      channelAccount: hashIt(channelAccount),
      channelId: hashIt(channelId),
    };

    const txOfframp = await enaRampServiceManagerFromUser.requestOfframp(
      params
    );
    const receiptOfframp = await txOfframp.wait();
    spinner.succeed(
      chalk.green(`✅ Offramp Requested! Tx Hash: ${receiptOfframp.hash}`)
    );
  } catch (error) {
    spinner.fail(
      chalk.red("❌ Error requesting Offramp: " + (error as Error).message)
    );
    return;
  }
}

// Handle response to an offramp request
async function responseToRequest(requestOfframpId: string): Promise<void> {
  const spinner = ora(chalk.cyan("Filling Offramp...")).start();

  try {
    const txFill = await enaRampServiceManager.fillOfframp(
      requestOfframpId,
      currentData[1],
      currentData[3]
    );
    const receiptFill = await txFill.wait();
    spinner.succeed(
      chalk.green(`✅ Offramp Filled! Tx Hash: ${receiptFill.hash}`)
    );
  } catch (error) {
    spinner.fail(
      chalk.red("❌ Error filling Offramp: " + (error as Error).message)
    );
  }
}

// Monitor new offramp requests
async function monitorNewOfframp(): Promise<void> {
  console.log(chalk.yellow("👀 Monitoring for new offramp requests..."));

  enaRampServiceManager.on(
    "RequestOfframp",
    async (requestOfframpId: string, task: any) => {
      console.log(
        chalk.blueBright(`🔔 New Offramp Request: ID => ${requestOfframpId}`)
      );
      await responseToRequest(requestOfframpId);
    }
  );
}

// Start creating tasks and monitoring events
function startCreatingTasks(): void {
  monitorNewOfframp().catch((error) => {
    console.error(
      chalk.red(
        "❌ Error monitoring offramp requests: " + (error as Error).message
      )
    );
  });

  currentData = generateRandomData();
  console.log(chalk.green(`✨ Creating new task with data: ${currentData}`));
  createNewTask(currentData[0], currentData[1], currentData[2], currentData[3]);

  // Uncomment this to create tasks every 30 seconds
  /*
  setInterval(() => {
    currentData = generateRandomData();
    console.log(chalk.green(`✨ Creating new task with data: ${currentData}`));
    createNewTask(currentData[0], currentData[1], currentData[2], currentData[3]);
  }, 30000);
  */
}

// Start the process
startCreatingTasks();
