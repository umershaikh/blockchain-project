// src/walletConfig.ts
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";

// Define chain configurations (only BSC for now)
const chains = [
  {
    chainId: 56, // Binance Smart Chain Mainnet
    name: "Binance Smart Chain",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed1.binance.org/",
  },
];

// WalletConnect metadata
const metadata = {
  name: "EverydayNFT",
  description: "MLM-based NFT platform",
  url: "https://everydaynft.com",
  icons: ["https://everydaynft.com/assets/img/logo/logo.png"],
};

// Create ethersConfig using defaultConfig
const ethersConfig = defaultConfig({ metadata });

// Create Web3Modal configuration
const projectId = "83337fa0d6a2d6cb6c5c4ac0b260c51c";
export const web3Modal = createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
});

// Initialize EthereumProvider for WalletConnect (only BSC for now)
export const initWalletConnectProvider = async () => {
  const provider = await EthereumProvider.init({
    projectId,
    chains: [56],
    optionalChains: [56],
    showQrModal: false, // We'll use Web3Modal's QR modal
    methods: ["eth_sendTransaction", "personal_sign"],
    events: ["chainChanged", "accountsChanged"],
    metadata,
  });
  return provider;
};