export const PinkyPromiseAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "promiseId",
        "type": "uint256",
      },
    ],
    "name": "promiseAsSvg",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "promiseId",
        "type": "uint256",
      },
    ],
    "name": "promiseImageURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "promiseId",
        "type": "uint256",
      },
    ],
    "name": "promiseInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum PinkyPromise.PromiseColor",
            "name": "color",
            "type": "uint8",
          },
          {
            "internalType": "uint16",
            "name": "height",
            "type": "uint16",
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string",
          },
          {
            "internalType": "string",
            "name": "body",
            "type": "string",
          },
        ],
        "internalType": "struct PinkyPromise.PromiseData",
        "name": "data",
        "type": "tuple",
      },
      {
        "internalType": "enum PinkyPromise.PromiseState",
        "name": "state",
        "type": "uint8",
      },
      {
        "internalType": "address[]",
        "name": "signees",
        "type": "address[]",
      },
      {
        "internalType": "enum PinkyPromise.SigningState[]",
        "name": "signingStates",
        "type": "uint8[]",
      },
      {
        "internalType": "uint256",
        "name": "signedOn",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "promiseId",
        "type": "uint256",
      },
    ],
    "name": "promiseMetadataURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "promiseId",
        "type": "uint256",
      },
    ],
    "name": "promiseState",
    "outputs": [
      {
        "internalType": "enum PinkyPromise.PromiseState",
        "name": "",
        "type": "uint8",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
] as const;
