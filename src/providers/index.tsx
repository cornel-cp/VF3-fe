"use client";
import { ModalProvider } from "@/contexts/ModalContext";
import { AppProvider } from "../contexts/AppContext";
import { WalletConnectionProvider } from "../providers/WalletProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletConnectionProvider>
      <ModalProvider>
        <AppProvider>{children}</AppProvider>
      </ModalProvider>
    </WalletConnectionProvider>
  );
};
export default Providers;
