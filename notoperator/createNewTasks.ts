import { ethers } from "ethers";
import * as dotenv from "dotenv";
const fs = require('fs');
const path = require('path');
dotenv.config();

// Setup env variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const userwallet = new ethers.Wallet(process.env.USER_PRIVATE_KEY!, provider);
/// TODO: Hack
let chainId = 31337;

const avsDeploymentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../contracts/deployments/jackramp/${chainId}.json`), 'utf8'));
const jackRampServiceManagerAddress = avsDeploymentData.addresses.jackRampServiceManager;
const mockUSDAddress = avsDeploymentData.addresses.underlyingUSD;
const jackRampServiceManagerABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abis/JackRampServiceManager.json'), 'utf8'));
const mockUSDABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abis/MockUSD.json'), 'utf8'));
// Initialize contract objects from ABIs
const jackRampServiceManagerFromUser = new ethers.Contract(jackRampServiceManagerAddress, jackRampServiceManagerABI, userwallet);
const jackRampServiceManager = new ethers.Contract(jackRampServiceManagerAddress, jackRampServiceManagerABI, wallet);
const mockUSD = new ethers.Contract(mockUSDAddress, mockUSDABI, userwallet);


let currentData:any;

interface OfframpRequestParams {
    user: string;
    amount: bigint;
    amountRealWorld: bigint;
    channelAccount: string;
    channelId: string;
}

function hashIt(content: string) {
  let hexi  = ethers.toUtf8Bytes(content);
  const keccakHash = ethers.keccak256(hexi);
  return keccakHash;
}

// Function to generate random names
function generateRandomData(): [bigint, string, string, string] {
    const amounts = [BigInt(1000000), BigInt(2000000), BigInt(3000000), BigInt(1000000), BigInt(2000000), BigInt(1500000), BigInt(1000000), BigInt(1200000)];
    const channelIds = ['bca', 'bca', 'mandiri', 'bni', 'bca', 'bni', 'mandiri', 'bni'];
    const channelAccounts = ['111111', '222222', '333333', '444444', '111111', '343434', '656565', '78989'];
    const transactionIds = ['121', '122', '123', '124', '125', '126', '127', '128'];

    const index = Math.floor(Math.random() * amounts.length);

    const amount = amounts[index];
    const channelId = channelIds[index];
    const channelAccount = channelAccounts[index];
    const transactionId = transactionIds[index];

    console.log(`Random: ${amount} ${channelId} ${channelAccount} ${transactionId}`);
    return [amount, channelId, channelAccount, transactionId];
  }

async function createNewTask(amount: bigint, channelId: string, channelAccount: string, transactionId: string) {
    console.log(`Creating Task with amount: ${amount}, channelId: ${channelId}, channelAccount: ${channelAccount}`);

    let requestOfframpId: any;

    /// MINTING MOCK USD
    try {
        // Send a transaction to the createNewTask function
        const txMint = await mockUSD.mint(userwallet.address, amount);
        
        // Wait for the transaction to be mined
        const receiptMint = await txMint.wait();
        
        console.log(`Minting Mock USD Transaction successful with hash: ${receiptMint.hash}`);
    } catch (error) {
        console.error('Error sending transaction:', error);
        return;
    }

    /// APPROVAL MOCK USD
    try {
      // Send a transaction to the createNewTask function
      const txApprv = await mockUSD.approve(jackRampServiceManagerAddress, amount);
      
      // Wait for the transaction to be mined
      const receiptApprv = await txApprv.wait();
      
      console.log(`Approve Mock USD Transaction successful with hash: ${receiptApprv.hash}`);
  } catch (error) {
      console.error('Error sending transaction:', error);
      return;
  }

  /// MINTING JACKRAMP
  try {
    // Send a transaction to the createNewTask function
    const txMintJack = await jackRampServiceManagerFromUser.mint(amount);
    
    // Wait for the transaction to be mined
    const receiptMintjack = await txMintJack.wait();
    
    console.log(`Minting Jack USD Transaction successful with hash: ${receiptMintjack.hash}`);
} catch (error) {
    console.error('Error sending transaction:', error);
    return;
}

    // REQUEST OFFRAMP
    try {
        const params: OfframpRequestParams = {
            user: userwallet.address,
            amount: amount,
            amountRealWorld: amount,
            channelAccount: hashIt(channelAccount),
            channelId: hashIt(channelId),
        };

        // Send a transaction to the createNewTask function
        const txOfframp = await jackRampServiceManagerFromUser.requestOfframp(params);
        
        // Wait for the transaction to be mined
        const receiptOfframp = await txOfframp.wait();

        console.log(`Request Offramp Transaction successful with hash: ${receiptOfframp.hash}`);
    } catch (error) {
        console.error('Error sending transaction:', error);
        return;
    }
  
}

const responseToRequest = async (requestOfframpId: any) => {

   // FILL OFFRAMP
   try {
    // Send a transaction to the createNewTask function
    const txFill = await jackRampServiceManager.fillOfframp(
      requestOfframpId, 
      currentData[1], 
      currentData[3]
    );
    
    // Wait for the transaction to be mined
    const receiptFill = await txFill.wait();
    
    console.log(`Fill Offramp Transaction successful with hash: ${receiptFill.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
    return;
  }
};

const monitorNewOfframp = async () => {
  jackRampServiceManager.on("RequestOfframp", async (requestOfframpId: any, task: any) => {
      console.log(`New request detected: requestOfframpId ==> ${requestOfframpId}`);
      await responseToRequest(requestOfframpId);
  });

  console.log("Monitoring for new offramp request...");
};

// Function to create a new task with a random name every 15 seconds
function startCreatingTasks() {

  monitorNewOfframp().catch((error) => {
    console.error("Error monitoring offramp request:", error);
  });

  currentData = generateRandomData();
  console.log(`Creating new task with data: ${currentData}`);
  createNewTask(currentData[0], currentData[1], currentData[2], currentData[3]);
/*
  setInterval(() => {
    currentData = generateRandomData();
    console.log(`Creating new task with data: ${currentData}`);
    createNewTask(currentData[0], currentData[1], currentData[2], currentData[3]);
  }, 30000);*/
}

// Start the process
startCreatingTasks();