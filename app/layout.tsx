import type { Metadata } from "next";
import "./globals.css";
import { WalletConnectionProvider } from "@/component/Providers/walletProvider";
import { Header } from "@/component/layout/Header";

export const metadata: Metadata = {
  title: "PromptClash",
  description: "Frontend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <WalletConnectionProvider>
          <Header />
          {children}
        </WalletConnectionProvider>
      </body>
    </html>
  )
}
