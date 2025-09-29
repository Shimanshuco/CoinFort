"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Trash } from "lucide-react";

const WalletCard = ({ wallet, onDelete }) => {
  const [showPrivate, setShowPrivate] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: toast instead of alert
  };

  if (!wallet) return null;

  // Fallbacks for missing keys
  const publicKey = wallet.publicKey || wallet.address || "N/A";
  const privateKey = typeof wallet.privateKey === "string" ? wallet.privateKey : "";
  const chain = wallet.chain ? wallet.chain.toUpperCase() : "WALLET";

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-2xl cf-card">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl">{chain} Wallet</h3>
          {wallet.name && (
            <p className="text-sm text-gray-500">{wallet.name}</p>
          )}
          {wallet.derivationPath && (
            <p className="text-xs text-gray-400 font-mono">{wallet.derivationPath}</p>
          )}
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
          aria-label="Delete wallet"
        >
          <Trash />
        </button>
      </div>

      <div className="flex flex-col gap-1 cursor-pointer" onClick={() => copyToClipboard(publicKey)}>
        <span className="font-semibold">Public Key</span>
        <span className="truncate break-all">{publicKey}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold">Private Key</span>
        <div className="flex justify-between items-center">
          <span
            className="truncate break-all cursor-pointer"
            onClick={() => copyToClipboard(privateKey)}
          >
            {showPrivate
              ? privateKey || "(not available)"
              : "•".repeat(privateKey.length || 8)}
          </span>
          <button
            onClick={() => setShowPrivate(!showPrivate)}
            aria-label={showPrivate ? "Hide private key" : "Show private key"}
          >
            {showPrivate ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
