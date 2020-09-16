
const address: string = "2MtPUo7bn8e5do7STqfQTxxKjJ6maowZ2JaYjnb5KjKAK7KUfuQVLiB2my1pYgRjAesTd4LZ5e553Ynr3jMQ49jq";


const abi: any =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "referCode",
				"type": "string"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "info",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "own",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "referCode",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "lastWithDrawTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "createTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "directUserCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "indirectUserCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interest",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refer",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "v1",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "v2",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "level",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "v1Count",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "canWithDraw",
						"type": "uint256"
					}
				],
				"internalType": "struct Types.UserInfo",
				"name": "userInfo",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vPoolInfon",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "v1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "v2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "weekInfos",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint64",
						"name": "startTime",
						"type": "uint64"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "seq",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "startTime",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "quantity",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalSelled",
								"type": "uint256"
							},
							{
								"internalType": "uint256[]",
								"name": "selledOfDay",
								"type": "uint256[]"
							}
						],
						"internalType": "struct Types.Phase[]",
						"name": "period",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Types.Weeks",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withDraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export{
    abi,
    address,
}