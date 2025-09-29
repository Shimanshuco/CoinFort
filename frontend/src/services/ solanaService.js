import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export function createSolanaWallet() {
    const keypair = Keypair.generate();
    return {
        address: keypair.publicKey.toBase58(),
        secretKey: Array.from(keypair.secretKey),
    }
};

export function restoreSolanaWallet(secretKeyArray){
    const secretKey = Uint8Array.from(secretKeyArray);
    const keypair = Keypair.fromSecretKey(secretKey);
    return {
        address: keypair.publicKey.toBase58(),
    }
};

export async function getSolanaBalance(address) {
  const balance = await connection.getBalance(address);
  return balance / LAMPORTS_PER_SOL;
};


