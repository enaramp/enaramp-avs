//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ECDSAStakeRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ecdsaStakeRegistryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_delegationManager',
        internalType: 'contract IDelegationManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deregisterOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'getLastCheckpointOperatorWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastCheckpointThresholdWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_blockNumber', internalType: 'uint32', type: 'uint32' }],
    name: 'getLastCheckpointThresholdWeightAtBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastCheckpointTotalWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_blockNumber', internalType: 'uint32', type: 'uint32' }],
    name: 'getLastCheckpointTotalWeightAtBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'getLastestOperatorSigningKey',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getOperatorSigningKeyAtBlock',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'getOperatorWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_blockNumber', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'getOperatorWeightAtBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_serviceManager', internalType: 'address', type: 'address' },
      { name: '_thresholdWeight', internalType: 'uint256', type: 'uint256' },
      {
        name: '_quorum',
        internalType: 'struct Quorum',
        type: 'tuple',
        components: [
          {
            name: 'strategies',
            internalType: 'struct StrategyParams[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_dataHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signatureData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minimumWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'operatorRegistered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'quorum',
    outputs: [
      {
        name: '',
        internalType: 'struct Quorum',
        type: 'tuple',
        components: [
          {
            name: 'strategies',
            internalType: 'struct StrategyParams[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_operatorSignature',
        internalType: 'struct ISignatureUtils.SignatureWithSaltAndExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_signingKey', internalType: 'address', type: 'address' },
    ],
    name: 'registerOperatorWithSignature',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newMinimumWeight', internalType: 'uint256', type: 'uint256' },
      { name: '_operators', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'updateMinimumWeight',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newSigningKey', internalType: 'address', type: 'address' },
    ],
    name: 'updateOperatorSigningKey',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operators', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'updateOperators',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'operatorsPerQuorum',
        internalType: 'address[][]',
        type: 'address[][]',
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateOperatorsForQuorum',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_quorum',
        internalType: 'struct Quorum',
        type: 'tuple',
        components: [
          {
            name: 'strategies',
            internalType: 'struct StrategyParams[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
        ],
      },
      { name: '_operators', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'updateQuorumConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_thresholdWeight', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateStakeThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_old',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_new',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinimumWeightUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_avs', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OperatorDeregistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_avs', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OperatorRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OperatorWeightUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_old',
        internalType: 'struct Quorum',
        type: 'tuple',
        components: [
          {
            name: 'strategies',
            internalType: 'struct StrategyParams[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
        ],
        indexed: false,
      },
      {
        name: '_new',
        internalType: 'struct Quorum',
        type: 'tuple',
        components: [
          {
            name: 'strategies',
            internalType: 'struct StrategyParams[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'QuorumUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'updateBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newSigningKey',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldSigningKey',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SigningKeyUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_thresholdWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ThresholdWeightUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldTotalWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newTotalWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TotalWeightUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldMinimumWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newMinimumWeight',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UpdateMinimumWeight',
  },
  { type: 'error', inputs: [], name: 'InsufficientSignedStake' },
  { type: 'error', inputs: [], name: 'InsufficientWeight' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidQuorum' },
  { type: 'error', inputs: [], name: 'InvalidReferenceBlock' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'InvalidSignedWeight' },
  { type: 'error', inputs: [], name: 'InvalidThreshold' },
  { type: 'error', inputs: [], name: 'LengthMismatch' },
  { type: 'error', inputs: [], name: 'MustUpdateAllOperators' },
  { type: 'error', inputs: [], name: 'NotSorted' },
  { type: 'error', inputs: [], name: 'OperatorAlreadyRegistered' },
  { type: 'error', inputs: [], name: 'OperatorNotRegistered' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAVSDirectory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iavsDirectoryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'OPERATOR_AVS_REGISTRATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'avs', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateOperatorAVSRegistrationDigestHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'deregisterOperatorFromAVS',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'operatorSaltIsSpent',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      {
        name: 'operatorSignature',
        internalType: 'struct ISignatureUtils.SignatureWithSaltAndExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'registerOperatorToAVS',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'metadataURI', internalType: 'string', type: 'string' }],
    name: 'updateAVSMetadataURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'avs', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'AVSMetadataURIUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'avs', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'status',
        internalType: 'enum IAVSDirectory.OperatorAVSRegistrationStatus',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'OperatorAVSRegistrationStatusUpdated',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IDelegationManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iDelegationManagerAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DELEGATION_APPROVAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'STAKER_DELEGATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'beaconChainETHStrategy',
    outputs: [
      { name: '', internalType: 'contract IStrategy', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateCurrentStakerDelegationDigestHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '_delegationApprover', internalType: 'address', type: 'address' },
      { name: 'approverSalt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateDelegationApprovalDigestHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: '_stakerNonce', internalType: 'uint256', type: 'uint256' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateStakerDelegationDigestHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'withdrawal',
        internalType: 'struct IDelegationManager.Withdrawal',
        type: 'tuple',
        components: [
          { name: 'staker', internalType: 'address', type: 'address' },
          { name: 'delegatedTo', internalType: 'address', type: 'address' },
          { name: 'withdrawer', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'startBlock', internalType: 'uint32', type: 'uint32' },
          {
            name: 'strategies',
            internalType: 'contract IStrategy[]',
            type: 'address[]',
          },
          { name: 'shares', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
    name: 'calculateWithdrawalRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'withdrawal',
        internalType: 'struct IDelegationManager.Withdrawal',
        type: 'tuple',
        components: [
          { name: 'staker', internalType: 'address', type: 'address' },
          { name: 'delegatedTo', internalType: 'address', type: 'address' },
          { name: 'withdrawer', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'startBlock', internalType: 'uint32', type: 'uint32' },
          {
            name: 'strategies',
            internalType: 'contract IStrategy[]',
            type: 'address[]',
          },
          { name: 'shares', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      {
        name: 'middlewareTimesIndex',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'receiveAsTokens', internalType: 'bool', type: 'bool' },
    ],
    name: 'completeQueuedWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'withdrawals',
        internalType: 'struct IDelegationManager.Withdrawal[]',
        type: 'tuple[]',
        components: [
          { name: 'staker', internalType: 'address', type: 'address' },
          { name: 'delegatedTo', internalType: 'address', type: 'address' },
          { name: 'withdrawer', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'startBlock', internalType: 'uint32', type: 'uint32' },
          {
            name: 'strategies',
            internalType: 'contract IStrategy[]',
            type: 'address[]',
          },
          { name: 'shares', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
      {
        name: 'tokens',
        internalType: 'contract IERC20[][]',
        type: 'address[][]',
      },
      {
        name: 'middlewareTimesIndexes',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'receiveAsTokens', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'completeQueuedWithdrawals',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'cumulativeWithdrawalsQueued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: 'strategy', internalType: 'contract IStrategy', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseDelegatedShares',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      {
        name: 'approverSignatureAndExpiry',
        internalType: 'struct ISignatureUtils.SignatureWithExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'approverSalt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
      {
        name: 'stakerSignatureAndExpiry',
        internalType: 'struct ISignatureUtils.SignatureWithExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'approverSignatureAndExpiry',
        internalType: 'struct ISignatureUtils.SignatureWithExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'approverSalt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateToBySignature',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'delegatedTo',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'delegationApprover',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegationApprover', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegationApproverSaltIsSpent',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'domainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      {
        name: 'strategies',
        internalType: 'contract IStrategy[]',
        type: 'address[]',
      },
    ],
    name: 'getOperatorShares',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'strategies',
        internalType: 'contract IStrategy[]',
        type: 'address[]',
      },
    ],
    name: 'getWithdrawalDelay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'staker', internalType: 'address', type: 'address' },
      { name: 'strategy', internalType: 'contract IStrategy', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseDelegatedShares',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'isDelegated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'isOperator',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minWithdrawalDelayBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newOperatorDetails',
        internalType: 'struct IDelegationManager.OperatorDetails',
        type: 'tuple',
        components: [
          {
            name: '__deprecated_earningsReceiver',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'delegationApprover',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'stakerOptOutWindowBlocks',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
      },
    ],
    name: 'modifyOperatorDetails',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'operatorDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct IDelegationManager.OperatorDetails',
        type: 'tuple',
        components: [
          {
            name: '__deprecated_earningsReceiver',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'delegationApprover',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'stakerOptOutWindowBlocks',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'strategy', internalType: 'contract IStrategy', type: 'address' },
    ],
    name: 'operatorShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'queuedWithdrawalParams',
        internalType: 'struct IDelegationManager.QueuedWithdrawalParams[]',
        type: 'tuple[]',
        components: [
          {
            name: 'strategies',
            internalType: 'contract IStrategy[]',
            type: 'address[]',
          },
          { name: 'shares', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'withdrawer', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'queueWithdrawals',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'registeringOperatorDetails',
        internalType: 'struct IDelegationManager.OperatorDetails',
        type: 'tuple',
        components: [
          {
            name: '__deprecated_earningsReceiver',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'delegationApprover',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'stakerOptOutWindowBlocks',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
      },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
    ],
    name: 'registerAsOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'stakerNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'stakerOptOutWindowBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', internalType: 'contract IStrategy', type: 'address' },
    ],
    name: 'strategyWithdrawalDelayBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'undelegate',
    outputs: [
      { name: 'withdrawalRoot', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'metadataURI', internalType: 'string', type: 'string' }],
    name: 'updateOperatorMetadataURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinWithdrawalDelayBlocksSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOperatorDetails',
        internalType: 'struct IDelegationManager.OperatorDetails',
        type: 'tuple',
        components: [
          {
            name: '__deprecated_earningsReceiver',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'delegationApprover',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'stakerOptOutWindowBlocks',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
        indexed: false,
      },
    ],
    name: 'OperatorDetailsModified',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'OperatorMetadataURIUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operatorDetails',
        internalType: 'struct IDelegationManager.OperatorDetails',
        type: 'tuple',
        components: [
          {
            name: '__deprecated_earningsReceiver',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'delegationApprover',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'stakerOptOutWindowBlocks',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
        indexed: false,
      },
    ],
    name: 'OperatorRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'strategy',
        internalType: 'contract IStrategy',
        type: 'address',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OperatorSharesDecreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'strategy',
        internalType: 'contract IStrategy',
        type: 'address',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OperatorSharesIncreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'StakerDelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'StakerForceUndelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'StakerUndelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'strategy',
        internalType: 'contract IStrategy',
        type: 'address',
        indexed: false,
      },
      {
        name: 'previousValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StrategyWithdrawalDelayBlocksSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'WithdrawalCompleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'withdrawal',
        internalType: 'struct IDelegationManager.Withdrawal',
        type: 'tuple',
        components: [
          { name: 'staker', internalType: 'address', type: 'address' },
          { name: 'delegatedTo', internalType: 'address', type: 'address' },
          { name: 'withdrawer', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'startBlock', internalType: 'uint32', type: 'uint32' },
          {
            name: 'strategies',
            internalType: 'contract IStrategy[]',
            type: 'address[]',
          },
          { name: 'shares', internalType: 'uint256[]', type: 'uint256[]' },
        ],
        indexed: false,
      },
    ],
    name: 'WithdrawalQueued',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JackRampServiceManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const jackRampServiceManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_avsDirectory', internalType: 'address', type: 'address' },
      { name: '_stakeRegistry', internalType: 'address', type: 'address' },
      { name: '_rewardsCoordinator', internalType: 'address', type: 'address' },
      { name: '_delegationManager', internalType: 'address', type: 'address' },
      { name: '_underlyingUSD', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    name: 'allTaskHashes',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'allTaskResponses',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'avsDirectory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'task',
        internalType: 'struct IJackRampServiceManager.Task',
        type: 'tuple',
        components: [
          { name: 'channelId', internalType: 'string', type: 'string' },
          { name: 'transactionId', internalType: 'string', type: 'string' },
          {
            name: 'requestOfframpId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'taskCreatedBlock', internalType: 'uint32', type: 'uint32' },
        ],
      },
      { name: 'referenceTaskIndex', internalType: 'uint32', type: 'uint32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'completeOfframp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardsSubmissions',
        internalType: 'struct IRewardsCoordinator.RewardsSubmission[]',
        type: 'tuple[]',
        components: [
          {
            name: 'strategiesAndMultipliers',
            internalType: 'struct IRewardsCoordinator.StrategyAndMultiplier[]',
            type: 'tuple[]',
            components: [
              {
                name: 'strategy',
                internalType: 'contract IStrategy',
                type: 'address',
              },
              { name: 'multiplier', internalType: 'uint96', type: 'uint96' },
            ],
          },
          { name: 'token', internalType: 'contract IERC20', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTimestamp', internalType: 'uint32', type: 'uint32' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
    name: 'createAVSRewardsSubmission',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'deregisterOperatorFromAVS',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requestOfframpId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'string', type: 'string' },
      { name: 'transactionId', internalType: 'string', type: 'string' },
    ],
    name: 'fillOfframp',
    outputs: [
      {
        name: 'newTask',
        internalType: 'struct IJackRampServiceManager.Task',
        type: 'tuple',
        components: [
          { name: 'channelId', internalType: 'string', type: 'string' },
          { name: 'transactionId', internalType: 'string', type: 'string' },
          {
            name: 'requestOfframpId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'taskCreatedBlock', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'getOperatorRestakedStrategies',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRestakeableStrategies',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'latestTaskNum',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'offrampRequests',
    outputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'amountRealWorld', internalType: 'uint256', type: 'uint256' },
      { name: 'channelAccount', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'requestCreatedBlock', internalType: 'uint32', type: 'uint32' },
      { name: 'isCompleted', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      {
        name: 'operatorSignature',
        internalType: 'struct ISignatureUtils.SignatureWithSaltAndExpiry',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'expiry', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'registerOperatorToAVS',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IJackRampServiceManager.OfframpRequestParams',
        type: 'tuple',
        components: [
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'amountRealWorld', internalType: 'uint256', type: 'uint256' },
          { name: 'channelAccount', internalType: 'bytes32', type: 'bytes32' },
          { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
        ],
      },
    ],
    name: 'requestOfframp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsInitiator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newRewardsInitiator', internalType: 'address', type: 'address' },
    ],
    name: 'setRewardsInitiator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeRegistry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'underlyingUSD',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_metadataURI', internalType: 'string', type: 'string' }],
    name: 'updateAVSMetadataURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestOfframpId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'proof',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'reclaimProof',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'FillOfframp',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'taskIndex',
        internalType: 'uint32',
        type: 'uint32',
        indexed: true,
      },
      {
        name: 'task',
        internalType: 'struct IJackRampServiceManager.Task',
        type: 'tuple',
        components: [
          { name: 'channelId', internalType: 'string', type: 'string' },
          { name: 'transactionId', internalType: 'string', type: 'string' },
          {
            name: 'requestOfframpId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'taskCreatedBlock', internalType: 'uint32', type: 'uint32' },
        ],
        indexed: false,
      },
    ],
    name: 'NewOfframpRequestCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'taskIndex',
        internalType: 'uint32',
        type: 'uint32',
        indexed: true,
      },
      {
        name: 'task',
        internalType: 'struct IJackRampServiceManager.Task',
        type: 'tuple',
        components: [
          { name: 'channelId', internalType: 'string', type: 'string' },
          { name: 'transactionId', internalType: 'string', type: 'string' },
          {
            name: 'requestOfframpId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'taskCreatedBlock', internalType: 'uint32', type: 'uint32' },
        ],
        indexed: false,
      },
    ],
    name: 'NewTaskCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestOfframpId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'params',
        internalType: 'struct IJackRampServiceManager.NewOfframpRequest',
        type: 'tuple',
        components: [
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'amountRealWorld', internalType: 'uint256', type: 'uint256' },
          { name: 'channelAccount', internalType: 'bytes32', type: 'bytes32' },
          { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'requestCreatedBlock',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
        indexed: false,
      },
    ],
    name: 'RequestOfframp',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'prevRewardsInitiator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newRewardsInitiator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RewardsInitiatorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'taskIndex',
        internalType: 'uint32',
        type: 'uint32',
        indexed: true,
      },
      {
        name: 'task',
        internalType: 'struct IJackRampServiceManager.Task',
        type: 'tuple',
        components: [
          { name: 'channelId', internalType: 'string', type: 'string' },
          { name: 'transactionId', internalType: 'string', type: 'string' },
          {
            name: 'requestOfframpId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'taskCreatedBlock', internalType: 'uint32', type: 'uint32' },
        ],
        indexed: false,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TaskResponded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  { type: 'error', inputs: [], name: 'CallerNotOperator' },
  { type: 'error', inputs: [], name: 'OfframpRequestAlreadyCompleted' },
  { type: 'error', inputs: [], name: 'OfframpRequestAlreadyExists' },
  { type: 'error', inputs: [], name: 'OfframpRequestAmountIsZero' },
  { type: 'error', inputs: [], name: 'OfframpRequestChannelAccountIsEmpty' },
  { type: 'error', inputs: [], name: 'OfframpRequestChannelIdIsEmpty' },
  { type: 'error', inputs: [], name: 'OfframpRequestDoesNotExist' },
] as const
