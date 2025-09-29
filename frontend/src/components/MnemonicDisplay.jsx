"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";

const MnemonicDisplay = ({ words, show, onToggle, onCopy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-6 w-full max-w-3xl mx-auto"
    >
      <div className="flex justify-between w-full items-center">
        <h2 className="text-2xl font-bold tracking-tight text-blue-600">
          Your Secret Phrase
        </h2>
        <button
          onClick={onToggle}
          className="text-gray-700 hover:text-blue-600"
          aria-label={show ? "Hide mnemonic" : "Show mnemonic"}
        >
          {show ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {show && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 w-full">
            {words.map((word, idx) => (
              <span
                key={idx}
                className="text-center bg-gray-100 hover:bg-gray-200 rounded-lg p-3 transition-all cursor-pointer"
              >
                {word}
              </span>
            ))}
          </div>
          <button
            onClick={() => onCopy(words.join(" "))}
            className="flex items-center gap-2 mt-2 text-gray-500 hover:text-blue-600"
          >
            <Copy size={16} /> Copy Secret Phrase
          </button>
        </>
      )}
    </motion.div>
  );
};

export default MnemonicDisplay;
