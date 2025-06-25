import { BACKEND_WALLET } from "@/config";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export class SolanaRpcService {
  private static instance: SolanaRpcService;
  private connection: Connection;
  private backendWallet: PublicKey;

  private constructor() {
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || ""
    );
    this.backendWallet = new PublicKey(BACKEND_WALLET)
  }

  public static getInstance(): SolanaRpcService {
    if (!SolanaRpcService.instance) {
      SolanaRpcService.instance = new SolanaRpcService();
    }
    return SolanaRpcService.instance;
  }

  public async getBalance(walletAddress: string): Promise<number> {
    const balance = await this.connection.getBalance(
      new PublicKey(walletAddress)
    );
    return balance;
  }

  public async deposit(
    amount: number,
    wallet: WalletContextState
  ): Promise<string> {
    try {
      const depositAmount = Math.floor(amount * LAMPORTS_PER_SOL);
      
      // Create the transfer transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: this.backendWallet,
          lamports: depositAmount,
        })
      );

      // Get recent blockhash and set transaction properties
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.feePayer = wallet.publicKey!;
      transaction.recentBlockhash = blockhash;

      const balance = await this.getBalance(wallet.publicKey!.toBase58());
      console.log('Balance:', balance, 'Deposit Amount:', depositAmount);

      // Check if user has sufficient balance
      if (balance < depositAmount) {
        throw new Error('Insufficient balance for this transaction');
      }

      // Send the transaction using the wallet (it handles signing internally)
      const signature = await wallet.sendTransaction!(transaction, this.connection);

      await this.connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error(`Deposit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
