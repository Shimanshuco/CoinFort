"use client";
import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import MnemonicDisplay from "../components/MnemonicDisplay";
import WalletCard from "../components/WalletCard";

const WalletManager = () => {
  const { wallets, masterMnemonic, addWallet, deleteWallet, clearWallets, resetMasterMnemonic } = useContext(WalletContext);

  const [mnemonicInput, setMnemonicInput] = useState("");
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [lastGeneratedMnemonic, setLastGeneratedMnemonic] = useState("");
  const [error, setError] = useState("");

  const handleGenerateWallet = async () => {
    if (!selectedChain) {
      setError("Please select a blockchain");
      return;
    }
    
    try {
      setError("");
      const newWallet = await addWallet(selectedChain, mnemonicInput || undefined);
      if (newWallet && newWallet.mnemonic) {
        setLastGeneratedMnemonic(newWallet.mnemonic);
        setShowMnemonic(true);
      }
      setMnemonicInput("");
    } catch (err) {
      setError(`Failed to create wallet: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-12 cf-container">

      {/* Blockchain selection */}
      <div className="flex gap-4 justify-center">
        {["ethereum", "solana"].map((chain) => (
          <button
            key={chain}
            onClick={() => setSelectedChain(chain)}
            className={`px-6 py-3 rounded-lg font-bold ${
              selectedChain === chain
                ? chain === "ethereum"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-pressed={selectedChain === chain}
          >
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </button>
        ))}
      </div>

      {/* Master Mnemonic Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800">Your Master Seed Phrase</h3>
          <button
            onClick={() => {
              const newMnemonic = resetMasterMnemonic();
              setLastGeneratedMnemonic(newMnemonic);
              setShowMnemonic(true);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Generate New
          </button>
        </div>
        <p className="text-sm text-blue-600 mb-2">
          This seed phrase is used to generate all your wallets. Keep it safe!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {masterMnemonic.split(' ').map((word, idx) => (
            <span
              key={idx}
              className="text-center bg-white border border-blue-200 rounded p-2 text-sm font-mono"
            >
              {idx + 1}. {word}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(masterMnemonic);
            alert("Master mnemonic copied to clipboard!");
          }}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Copy Master Seed Phrase
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto">
          {error}
        </div>
      )}

      {/* Mnemonic input */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Enter custom mnemonic (optional - will use master mnemonic if empty)"
          value={mnemonicInput}
          onChange={(e) => setMnemonicInput(e.target.value)}
          className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
        />
        <p className="text-xs text-gray-500 text-center">
          Leave empty to create another account from your master seed, or enter a custom 12-word mnemonic to import/create from different seed
        </p>
        <button
          onClick={handleGenerateWallet}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {mnemonicInput ? "Add Wallet from Custom Seed" : "Create New Account"}
        </button>
        {selectedChain && (
          <p className="text-xs text-gray-500 text-center">
            {wallets.filter(w => w.chain === selectedChain).length > 0
              ? `You have ${wallets.filter(w => w.chain === selectedChain).length} ${selectedChain} account(s)`
              : `Create your first ${selectedChain} account`}
          </p>
        )}
      </div>

      {/* Mnemonic Display */}
      {showMnemonic && lastGeneratedMnemonic && (
        <MnemonicDisplay
          words={lastGeneratedMnemonic.split(" ")}
          show={showMnemonic}
          onToggle={() => setShowMnemonic(!showMnemonic)}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            alert("Mnemonic copied to clipboard!");
          }}
        />
      )}

      {/* Wallet Grid */}
      {wallets.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {wallets.map((wallet, idx) => (
            <WalletCard
              key={wallet.id || wallet.address || idx}
              wallet={wallet}
              onDelete={() => deleteWallet(idx)}
            />
          ))}
        </div>
      )}

      {/* Clear All */}
      {wallets.length > 0 && (
        <button
          onClick={clearWallets}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Clear All Wallets
        </button>
      )}
    </div>
  );
};

export default WalletManager;
