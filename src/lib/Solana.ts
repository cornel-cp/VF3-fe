import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export class SolanaRpcService {
  private static instance: SolanaRpcService;
  private connection: Connection;

  private constructor() {
    this.connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "");
  }

  public static getInstance(): SolanaRpcService {
    if (!SolanaRpcService.instance) {
      SolanaRpcService.instance = new SolanaRpcService();
    }
    return SolanaRpcService.instance;
  }

  public async getBalance(walletAddress: string): Promise<number> {
    const balance = await this.connection.getBalance(new PublicKey(walletAddress));
    return balance;
  }
}