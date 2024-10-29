// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IJackRampServiceManager {
    error OfframpRequestAlreadyExists();
    error OfframpRequestAmountIsZero();
    error OfframpRequestChannelAccountIsEmpty();
    error OfframpRequestChannelIdIsEmpty();
    error OfframpRequestDoesNotExist();
    error OfframpRequestAlreadyCompleted();
    error CallerNotOperator();

    event Mint(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event RequestOfframp(bytes32 requestOfframpId, NewOfframpRequest params);
    event FillOfframp(
        bytes32 requestOfframpId,
        address receiver,
        bytes32 proof,
        bytes32 reclaimProof
    );
    event NewOfframpRequestCreated(uint32 indexed taskIndex, Task task);
    event NewTaskCreated(uint32 indexed taskIndex, Task task);
    event TaskResponded(uint32 indexed taskIndex, Task task, address operator);

    struct OfframpRequestParams {
        address user;
        uint256 amount;
        uint256 amountRealWorld;
        bytes32 channelAccount;
        bytes32 channelId;
    }

    struct NewOfframpRequest {
        address user;
        uint256 amount;
        uint256 amountRealWorld;
        bytes32 channelAccount;
        bytes32 channelId;
        uint32 requestCreatedBlock;
    }

    struct OfframpRequestStorage {
        address user;
        uint256 amount;
        uint256 amountRealWorld;
        bytes32 channelAccount;
        bytes32 channelId;
        uint32 requestCreatedBlock;
        bool isCompleted;
    }

    struct Task {
        string channelId;
        string transactionId;
        bytes32 requestOfframpId;
        address receiver;
        uint32 taskCreatedBlock;
    }

    function latestTaskNum() external view returns (uint32);
    function allTaskHashes(uint32 taskIndex) external view returns (bytes32);
    function allTaskResponses(
        address operator,
        uint32 taskIndex
    ) external view returns (bytes memory);
}
