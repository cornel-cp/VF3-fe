import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "PromptClash",
  description: "Frontend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
