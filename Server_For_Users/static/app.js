const contractAddress = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
const abi = [{
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "LandMarkedForSale",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "LandPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "LandRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "LandVerified",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "landCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lands",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "area",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isForSale",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_area",
          "type": "uint256"
        }
      ],
      "name": "registerLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "verifyLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getLand",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "markForSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "buyLand",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getAllLandIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getLandForSaleIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
];

let web3;
let contract;
let account;
let username = "";
let role = "";

window.addEventListener("load", async () => {
  try {
    await fetchUserInfo();
    await initWeb3AndContract();  // initialize web3 and contract but don't connect wallet yet
    showSectionsAndAttachListeners();
  } catch (err) {
    console.error("Initialization error:", err);
  }
});


async function fetchUserInfo() {
  const res = await fetch("/user-info");
  if (!res.ok) {
    window.location.href = "/login-page";
    return;
  }
  const data = await res.json();
  username = data.username;
  role = data.role;
  document.getElementById("welcomeMsg").innerText = `Welcome, ${username} (${role})`;
}

async function initWeb3AndContract() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3("http://127.0.0.1:8545");
  }
  contract = new web3.eth.Contract(abi, contractAddress);
  // DON'T fetch accounts here to avoid auto connect
}


function showSectionsAndAttachListeners() {
  // Always attach these
  document.getElementById("searchLandBtn").onclick = searchLandById;
  document.getElementById("connectWalletBtn").onclick = connectWallet;
  document.getElementById("logoutBtn").onclick = logout;

  // Hide both sections initially
  document.getElementById("adminSection").style.display = "none";
  document.getElementById("userSection").style.display = "none";

  // Then show only based on role
  if (role === "admin") {
    document.getElementById("adminSection").style.display = "block";
    document.getElementById("registerLandBtn").onclick = registerLand;
    document.getElementById("verifyLandBtn").onclick = verifyLand;
    document.getElementById("markForSaleBtn").onclick = markForSale;
  } else if (role === "user") {
    document.getElementById("userSection").style.display = "block";
    document.getElementById("buyLandBtn").onclick = buyLand;
  }
}


async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      document.getElementById('connectStatus').innerText = `Connected: ${account}`;
      await refreshDashboard();  // Now that account is known, update UI
    } catch (error) {
      console.error("User denied MetaMask connection:", error);
    }
  } else {
    alert('MetaMask not detected');
  }
}


async function refreshDashboard() {
  if (!account) return;
  if (role === "admin") await loadAllLands();
  else await loadForSaleLands();
}

async function registerLand() {
  const msgDiv = document.getElementById("registerLandMsg");
  const id = parseInt(document.getElementById("landId").value);
  const location = document.getElementById("location").value;
  const area = parseInt(document.getElementById("area").value);
  if (isNaN(id) || isNaN(area) || !location) return alert("Invalid input");

  try {
    const existing = await contract.methods.lands(id).call();
    if (existing.owner !== "0x0000000000000000000000000000000000000000") {
      alert("Land already registered");
      return;
    }
    const tx = await contract.methods.registerLand(id, location, area).send({ from: account });
    alert("Land registered! Tx: " + tx.transactionHash);
    await refreshDashboard();
    
  document.getElementById("landId").value = "";
    document.getElementById("location").value = "";
    document.getElementById("area").value = "";
    msgDiv.style.color = "green";
    msgDiv.innerText = "Land registered successfully! Tx: " + tx.transactionHash;
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
  setTimeout(() => {
    msgDiv.innerText = "";
  }, 5000);
}

async function verifyLand() {
  const msgDiv = document.getElementById("verifyLandMsg");
  const id = parseInt(document.getElementById("verifyLandId").value);
  if (isNaN(id)) return alert("Invalid ID");
  try {
    const tx = await contract.methods.verifyLand(id).send({ from: account });
    alert("Verified! Tx: " + tx.transactionHash);
    await refreshDashboard();
    const verifyMsg = document.getElementById("verifyLandMsg");
verifyMsg.innerText = "Land verified successfully!";
    verifyMsg.style.color = "green";
    document.getElementById("verifyLandId").value = "";
  } catch (err) {
    alert("Verification failed: " + err.message);
  }
  setTimeout(() => {
    msgDiv.innerText = "";
  }, 5000);
}

async function markForSale() {
  const msgDiv = document.getElementById("markForSaleMsg");
  const id = parseInt(document.getElementById("saleLandId").value);
  const price = document.getElementById("salePrice").value;
  if (isNaN(id) || !price) return alert("Invalid input");
  try {
    const priceWei = web3.utils.toWei(price, "ether");
    const tx = await contract.methods.markForSale(id, priceWei).send({ from: account });
    alert("Marked for sale! Tx: " + tx.transactionHash);
    await refreshDashboard();
    const saleMsg = document.getElementById("markForSaleMsg");
saleMsg.innerText = "Land marked for sale!";
    saleMsg.style.color = "green";
    document.getElementById("saleLandId").value = "";
    document.getElementById("salePrice").value = "";
    
  } catch (err) {
    alert("Mark failed: " + err.message);
  }
  setTimeout(() => {
    msgDiv.innerText = "";
  }, 5000);
}

async function searchLandById() {
  const id = parseInt(document.getElementById("searchLandId").value);
  const resultDiv = document.getElementById("searchResult");
  resultDiv.innerText = "";
  if (isNaN(id)) return resultDiv.innerText = "Invalid ID";
  try {
    const land = await contract.methods.getLand(id).call();
    const status = land[3] ? (land[4] ? `For Sale (${web3.utils.fromWei(land[5], 'ether')} ETH)` : "Verified") : "Not Verified";
    resultDiv.innerText = `ID: ${id}\nLocation: ${land[0]}\nArea: ${land[1]}\nOwner: ${land[2]}\nStatus: ${status}`;
  } catch (err) {
    resultDiv.innerText = "Fetch failed: " + err.message;
  }
  setTimeout(() => {
    msgDiv.innerText = "";
  }, 5000);
}

async function buyLand() {
  const msgDiv = document.getElementById("buyLandMsg");
  const id = parseInt(document.getElementById("buyLandId").value);
  if (isNaN(id)) return alert("Invalid ID");
  try {
    const land = await contract.methods.lands(id).call();
    if (!land.isForSale) return alert("Not for sale");
    const tx = await contract.methods.buyLand(id).send({ from: account, value: land.price });
    alert("Purchased! Tx: " + tx.transactionHash);
    msgDiv.style.color = "green";
    msgDiv.innerText = "Land buy successfully! Tx: " + tx.transactionHash;
    await refreshDashboard();
  } catch (err) {
    alert("Purchase failed: " + err.message);
  }
  setTimeout(() => {
    msgDiv.innerText = "";
  }, 5000);
}

async function loadAllLands() {
  const list = document.getElementById("landList");
  list.innerHTML = "";
  try {
    const ids = await contract.methods.getAllLandIds().call();
    for (const id of ids) {
      const land = await contract.methods.lands(id).call();
      const status = land.isVerified ? (land.isForSale ? "For Sale" : "Verified") : "Not Verified";
      const li = document.createElement("li");
      li.innerText = `ID: ${id}, ${land.location}, Area: ${land.area}, ${status}`;
      list.appendChild(li);
    }
  } catch (err) {
    list.innerHTML = "Error loading lands: " + err.message;
  }
}

async function loadForSaleLands() {
  const list = document.getElementById("forSaleList");
  list.innerHTML = "";
  try {
    const ids = await contract.methods.getLandForSaleIds().call();
    for (const id of ids) {
      const land = await contract.methods.lands(id).call();
      const li = document.createElement("li");
      li.innerText = `ID: ${id}, ${land.location}, Area: ${land.area}, Price: ${web3.utils.fromWei(land.price, 'ether')} ETH`;
      list.appendChild(li);
    }
  } catch (err) {
    list.innerHTML = "Error loading for sale: " + err.message;
  }
}

async function logout() {
  await fetch("/logout");
  window.location.href = "/login-page";
}
