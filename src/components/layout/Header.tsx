"use client";

import { Bell, Heart, Plus, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ConnectButton } from "@/components/wedget/ConnectButton";
import { Logo } from "@/components/wedget/Logo";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { formatBalance } from "@/utils/format";

const HeaderMenu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Battle",
    href: "/battle",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "My Heroes",
    href: "/heroes"
  }
];

export const Header = () => {
  const { user } = useUser();
  return (
    <header className="border-b border-surface-tertiary bg-surface-primary/30 backdrop-blur-lg sticky top-0 z-50">
      <Container size="xl">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex items-center space-x-4">
            {HeaderMenu.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="text-text-primary hover:text-primary"
              >
                <Text>{item.label}</Text>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <Text>{formatBalance(user?.balance)}</Text>
                <Image
                  src="/images/solana_logo_black.png"
                  alt="Solana Logo"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
