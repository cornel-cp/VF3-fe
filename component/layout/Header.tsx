"use client";

import { Bell, Heart, Plus, Search, Settings } from "lucide-react";
import { Button } from "@/component/ui/Button";
import { Container } from "@/component/ui/Container";

export const Header = () => {
  return (
    <header className="border-b border-surface-tertiary bg-surface-primary/80 backdrop-blur-lg sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4"></div>

          <Button
            variant="primary"
            className="rounded-full p-3 animate-pulse-glow"
          >
            <Plus className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary hover:shadow-glow"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary hover:shadow-glow"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary hover:shadow-glow"
            >
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
