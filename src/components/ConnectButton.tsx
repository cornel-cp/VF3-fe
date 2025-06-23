import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./ui/Button";
import { useConnectWalletModal } from "@/hooks/useConnectWalletModal";

export const ConnectButton = () => {
  const { openWalletModal, isConnected } = useConnectWalletModal();
  const { wallet, disconnect } = useWallet();

  if (!isConnected) {
    return (
      <Button
        glow
        variant="ghost"
        className="rounded-full p-3 animate-pulse-glow"
        onClick={() => openWalletModal()}
      >
        Connect Wallet
      </Button>
    );
  }

  return <Button variant="primary" onClick={disconnect}>Disconnect</Button>;
};
