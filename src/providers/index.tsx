"use client";
import { ModalProvider } from "@/contexts/ModalContext";
import { AppProvider } from "../contexts/AppContext";
import { WalletConnectionProvider } from "../providers/WalletProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WalletConnectionProvider>
        <ModalProvider>
          <AppProvider>{children}</AppProvider>
        </ModalProvider>
      </WalletConnectionProvider>
    </QueryClientProvider>
  );
};
export default Providers;
