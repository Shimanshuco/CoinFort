import { Wallet, HDNodeWallet, JsonRpcProvider } from "ethers";
const ETH_RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/I1chPXSNrNwv663UstknF"; 
const provider = new JsonRpcProvider(ETH_RPC_URL);

export function createEthereumWallet(){
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  }
};

export function restoreEthereumWallet(mnemonic) {
    const wallet = HDNodeWallet.fromPhrase(mnemonic);
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
    }
};

export function getEthereumBalance(address) {
    const balance = provider.getBalance(address);
    return {
        balance: balance,
        formattedBalance: ethers.formatEther(balance)
    }
}