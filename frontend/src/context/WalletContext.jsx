
import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

// Helper: browser-safe random mnemonic generator
function generateMnemonic() {
  return ethers.Wallet.createRandom().mnemonic.phrase;
}

export const WalletContext = createContext();

const WALLET_STORAGE_KEY = "coinfort_wallets";
const MASTER_MNEMONIC_KEY = "coinfort_master_mnemonic";

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [masterMnemonic, setMasterMnemonic] = useState(() => {
    // Load master mnemonic from localStorage or generate new one
    const stored = localStorage.getItem(MASTER_MNEMONIC_KEY);
    return stored || generateMnemonic();
  });

  useEffect(() => {
    // Persist wallets to localStorage on change
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    // Persist master mnemonic to localStorage on change
    localStorage.setItem(MASTER_MNEMONIC_KEY, masterMnemonic);
  }, [masterMnemonic]);

  // Add a wallet for Ethereum or Solana
  const addWallet = async (chain, mnemonicInput) => {
    try {
      // Use provided mnemonic or master mnemonic
      const mnemonic = mnemonicInput || masterMnemonic;
      
      // If user provided a custom mnemonic, validate and use it
      if (mnemonicInput && mnemonicInput !== masterMnemonic) {
        if (!mnemonicInput || mnemonicInput.split(' ').length !== 12) {
          throw new Error('Invalid mnemonic phrase - must be 12 words');
        }
        // Update master mnemonic if user provided a valid one
        setMasterMnemonic(mnemonicInput);
      }
      
      // Find the next account index for this chain and mnemonic
      const existingWallets = wallets.filter(w => w.chain === chain && w.mnemonic === mnemonic);
      const accountIndex = existingWallets.length; // 0, 1, 2, 3...
      
      let newWallet;
      
      if (chain === "ethereum") {
        // Ethereum wallet generation with derivation path
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const derivationPath = `m/44'/60'/0'/0/${accountIndex}`; // Standard Ethereum path
        const accountNode = hdNode.derivePath(derivationPath);
        const wallet = new ethers.Wallet(accountNode.privateKey);
        
        newWallet = {
          id: Date.now(),
          chain,
          mnemonic,
          accountIndex,
          derivationPath,
          publicKey: wallet.address,
          privateKey: wallet.privateKey,
          name: `Account ${accountIndex + 1}`,
        };
      } else if (chain === "solana") {
        // Solana wallet generation with derivation path
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const derivationPath = `m/44'/501'/${accountIndex}'/0'`; // Standard Solana path
        const accountNode = hdNode.derivePath(derivationPath);
        const seedBuffer = ethers.utils.arrayify(accountNode.privateKey);
        const keypair = solanaWeb3.Keypair.fromSeed(seedBuffer.slice(0, 32));
        
        newWallet = {
          id: Date.now(),
          chain,
          mnemonic,
          accountIndex,
          derivationPath,
          publicKey: keypair.publicKey.toBase58(),
          privateKey: Array.from(keypair.secretKey)
            .map(b => b.toString(16).padStart(2, '0'))
            .join(''),
          name: `Account ${accountIndex + 1}`,
        };
      } else {
        throw new Error("Unsupported chain");
      }

      setWallets(prev => [...prev, newWallet]);
      return newWallet;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  };

  // Delete a wallet by index
  const deleteWallet = (idx) => {
    setWallets((prev) => prev.filter((_, i) => i !== idx));
  };

  // Reset master mnemonic (generate new one)
  const resetMasterMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMasterMnemonic(newMnemonic);
    return newMnemonic;
  };

  // Clear all wallets
  const clearWallets = () => setWallets([]);

  // Provide addWallet as async for WalletManager
  const contextValue = {
    wallets,
    masterMnemonic,
    addWallet: (...args) => Promise.resolve(addWallet(...args)),
    deleteWallet,
    clearWallets,
    resetMasterMnemonic,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
