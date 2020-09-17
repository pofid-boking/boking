
const address: string = "51rRAdVCnBUwBVnZw3LLv6nZ84i2NLJ5DC2X9vLdqJvgffdQ3YApbAJviQQitaNn1Rs6UvApnB3qkQdC2nXzrm3j";

// const address: string = "4EFcVb1CnvnabRQ2HuhvGWiPxeV4uv87fMjc1cVgfPcp3CF16krQKh47r566FvPjaUbmhMqbMZkNKikYSQ2y3btu";


const abi: any =[
	{
		"inputs": [],
		"name": "TodayPrice",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "pofidValue",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "usdValue",
						"type": "uint256"
					}
				],
				"internalType": "struct Types.Rate",
				"name": "rate",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
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
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getCode",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
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
					},
					{
						"internalType": "uint256",
						"name": "hasWithDraw",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "leftDay",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "ownner",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pofidValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "usdValue",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			}
		],
		"name": "start",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userTodayShare",
		"outputs": [
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