
# 🏡 Blockchain-Based Land Registration System

This is a secure, decentralized land registry system built using **Ethereum smart contracts**, **Flask backend**, **MongoDB**, and a **MetaMask-integrated frontend**. It enables trusted land transactions by eliminating fraud, tampering, and centralization issues found in traditional systems.

---

## 🚀 Features

### 👮 Admin
- Register new land records
- Verify land ownership and details
- Mark land as available for sale

### 👤 User
- Sign up/login with phone number
- View available land for purchase
- Buy land using MetaMask wallet

---

## ⚙️ Technology Stack

| Component       | Description                                        |
|----------------|----------------------------------------------------|
| **Frontend**    | HTML, CSS, JavaScript, Web3.js                    |
| **Backend**     | Python (Flask)                                     |
| **Blockchain**  | Ethereum Smart Contracts (Solidity) via **Ganache CLI** |
| **Database**    | MongoDB (for storing user credentials and roles)   |
| **Wallet**      | MetaMask (for wallet authentication and transactions) |

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/tripalsharma/Land-registry.git
cd Land-registry
```

### 2. Install Required Tools

- [Node.js](https://nodejs.org/)
- [Ganache CLI](https://trufflesuite.com/ganache/)  
  Install using:  
  ```bash
  npm install -g ganache
  ```
- [MetaMask](https://metamask.io/)
- [Python 3](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

## 🔧 Setup Instructions

### 3. Start Ganache CLI

Use a fixed mnemonic to generate consistent test accounts:
```bash
ganache-cli -p 8545 -m "your twelve word mnemonic goes here"
```

Ganache will start a local blockchain on:  
`http://127.0.0.1:8545`

### 4. Backend Setup (Flask)

```bash
# (Optional) Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask app
flask run
```

Backend will run at: `http://127.0.0.1:5000/`

---

### 5. Smart Contract Deployment

- Compile and deploy your smart contract using **Remix** or **Truffle** to the local Ganache CLI blockchain (`http://127.0.0.1:8545`).
- Copy the **contract address** and **ABI**, then paste them into `app.js`.

### 6. Frontend

- Open `dashboard.html` in your browser.
- Connect MetaMask to the **localhost:8545** network.
- Use your Ganache CLI accounts in MetaMask.
- Based on login, access admin or user functionality.

---

## 🧪 Testing

- Use MetaMask with Ganache CLI accounts for testing.
- Perform transactions such as registering land, verifying, marking for sale, and purchasing land.
- Confirm real-time on-chain ownership updates.

---

## ✅ Completed Features

- Role-based login system with phone number authentication
- Admin: register, verify, and list land for sale
- User: view and purchase land using MetaMask
- Smart contract integration with real blockchain logic
- Full dashboard interface for both roles

---

## 🛠 Future Improvements

- Deploy to public testnets (e.g., Goerli, Polygon)
- Add document upload via IPFS
- Integrate SMS or email OTP verification
- Link with government systems for legal land approval

---

## 🧠 Research Background

This project explores how blockchain can solve issues in traditional land registration, such as fraud, lack of trust, and centralized control.  
By combining smart contracts, MetaMask, and a local blockchain, it creates a secure and transparent digital land record system.

---

## 📚 References

A full list of academic references is included in the report. Key sources include:

- Krishnapriya & Sarath (2020) – Blockchain for land registry
- World Bank (2018) – Blockchain for developing nations
- Thomas (2020) – Challenges in blockchain-based land administration
- Tapscott (2016), Narayanan (2016), and others

---

## 📩 Contact

Developed by: **Tripal Sharma**  
GitHub: [@tripalsharma](https://github.com/tripalsharma)

---
s