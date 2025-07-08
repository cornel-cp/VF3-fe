import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState, WalletName } from "@solana/wallet-adapter-base";
import { Card, Switch } from "../ui";
import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface WalletInfo {
  name: WalletName;
  url: string;
  icon: string;
  installed: boolean;
  readyState: WalletReadyState;
}

interface ConnectWalletModalProps {
  onClose?: () => void;
  onSuccess?: () => void;
  showOnlyInstalled?: boolean;
}

export const ConnectWalletModal = ({
  onClose,
  onSuccess,
  showOnlyInstalled = false,
}: ConnectWalletModalProps) => {
  const { wallets, select, connect, connecting, connected, wallet, disconnect } =
    useWallet();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(!showOnlyInstalled);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Process wallet information
  const availableWallets: WalletInfo[] = [];
  wallets.forEach((wallet) => {
    if (wallet.adapter.name != "MetaMask") {
      availableWallets.push({
        name: wallet.adapter.name,
        url: wallet.adapter.url,
        icon: wallet.adapter.icon,
        installed: wallet.readyState === WalletReadyState.Installed,
        readyState: wallet.readyState,
      });
    }
  });

  // Filter wallets based on user preference
  const displayWallets = showAll
    ? availableWallets
    : availableWallets.filter((w) => w.installed);

  // Sort wallets: installed first, then by name
  const sortedWallets = displayWallets.sort((a, b) => {
    if (a.installed && !b.installed) return -1;
    if (!a.installed && b.installed) return 1;
    return a.name.localeCompare(b.name);
  });

  const handleWalletClick = useCallback(
    async (walletInfo: WalletInfo) => {
      if (!walletInfo.installed) {
        window.open(walletInfo.url, "_blank");
        return;
      }

      setError(null);
      setConnectingWallet(walletInfo.name);

      try {
        // Select and connect the wallet
        select(walletInfo.name);
        await connect();

        // Success handling
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 800);
      } catch (err) {
        console.error(`Failed to connect to ${walletInfo.name}:`, err);
        let errorMessage = "Failed to connect wallet";
        disconnect();
        if (err instanceof Error) {
          if (err.message.includes("User rejected")) {
            errorMessage = "Connection rejected. Please try again";
          } else {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
      } finally {
        setTimeout(() => setConnectingWallet(null), 500);
      }
    },
    [connect, disconnect, select, onSuccess, onClose]
  );

  const getWalletStatus = (walletInfo: WalletInfo) => {
    if (connectingWallet === walletInfo.name) {
      return {
        text: "Connecting...",
        className: "text-highlight animate-pulse font-medium",
      };
    }

    switch (walletInfo.readyState) {
      case WalletReadyState.Installed:
        return {
          text: "Ready",
          className: "text-primary font-medium",
        };
      case WalletReadyState.NotDetected:
        return {
          text: "Install",
          className:
            "text-text-tertiary hover:text-highlight transition-colors",
        };
      case WalletReadyState.Loadable:
        return {
          text: "Available",
          className: "text-highlight font-medium",
        };
      case WalletReadyState.Unsupported:
        return {
          text: "Unsupported",
          className: "text-red-400",
        };
      default:
        return {
          text: "Unknown",
          className: "text-text-muted",
        };
    }
  };

  const getWalletIcon = (walletInfo: WalletInfo) => {
    if (walletInfo.installed) {
      return (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-background rounded-full"></div>
        </div>
      );
    }
    if (walletInfo.readyState === WalletReadyState.Unsupported) {
      return (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs">✕</span>
        </div>
      );
    }
    return (
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-text-tertiary rounded-full flex items-center justify-center hover:bg-highlight transition-colors">
        <span className="text-xs">↓</span>
      </div>
    );
  };

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <Card
        hover={false}
        variant="default"
        className="relative max-w-lg mx-auto overflow-hidden border border-primary/10 shadow-card-glow"
      >
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-neon opacity-20 animate-gradient bg-[length:200%_200%]"></div>

        {/* Header */}
        <div className="relative p-6 border-b border-surface-tertiary/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary">Connect Wallet</h2>
              <p className="text-sm text-text-secondary mt-1">
                Choose your preferred wallet
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-text-tertiary hover:text-primary transition-colors duration-200 
                           hover:bg-surface-elevated rounded-lg group"
              >
                <span className="block w-5 h-5 relative">
                  <span className="absolute inset-0 bg-current opacity-20 rounded group-hover:animate-ping"></span>
                  <X className="w-5 h-5" />
                </span>
              </button>
            )}
          </div>

          {/* Toggle with smooth animation */}
          <div className="flex items-center justify-between mt-4 p-3 bg-surface-elevated/50 rounded-lg border border-surface-tertiary/30">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                Show all wallets
              </span>
              <span className="text-xs text-text-muted bg-surface-tertiary/50 px-2 py-1 rounded-full">
                {availableWallets.length}
              </span>
            </div>
            <Switch checked={showAll} onChange={setShowAll} />
          </div>
        </div>

        {/* Error Message with slide animation */}
        {error && (
          <div className="relative mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <span className="text-red-400">⚠</span>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Wallet List */}
        <div className="relative max-h-96 overflow-y-auto custom-scrollbar">
          {sortedWallets.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-surface-elevated rounded-full flex items-center justify-center">
                <span className="text-2xl opacity-50">👛</span>
              </div>
              <p className="text-text-secondary mb-2">
                No wallets {showAll ? "available" : "installed"}
              </p>
              {!showAll && (
                <button
                  onClick={() => setShowAll(true)}
                  className="text-highlight hover:text-primary transition-colors text-sm font-medium"
                >
                  Show all wallets to install
                </button>
              )}
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {sortedWallets.map((walletInfo, index) => {
                const status = getWalletStatus(walletInfo);
                const isConnecting = connectingWallet === walletInfo.name;
                const isDisabled = connecting || isConnecting;
                const isHovered = hoveredWallet === walletInfo.name;

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer w-100
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} 
                      ${
                        walletInfo.installed
                          ? "border-primary/20 bg-gradient-to-r from-surface-primary to-surface-secondary hover:border-primary/40 hover:shadow-glow"
                          : "border-surface-tertiary/30 bg-surface-secondary/50 hover:border-highlight/30"
                      }
                      ${isHovered ? "shadow-glow-teal" : "scale-100"}
                      ${
                        isConnecting
                          ? "border-highlight shadow-glow-teal animate-pulse"
                          : ""
                      }
                    `}
                    onClick={() => !isDisabled && handleWalletClick(walletInfo)}
                    onMouseEnter={() => setHoveredWallet(walletInfo.name)}
                    onMouseLeave={() => setHoveredWallet(null)}
                  >
                    {/* Hover glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 rounded-xl
                      ${
                        walletInfo.installed
                          ? "from-primary/5 to-highlight/5 opacity-0 group-hover:opacity-100"
                          : "from-highlight/3 to-primary/3 opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        {/* Wallet icon with status indicator */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300
                            ${
                              walletInfo.installed
                                ? "border-primary/30"
                                : "border-surface-tertiary/30"
                            }
                            ${isHovered ? "border-primary scale-110" : ""}
                            ${
                              isConnecting
                                ? "border-highlight animate-pulse"
                                : ""
                            }
                          `}
                          >
                            <Image
                              src={walletInfo.icon}
                              alt={walletInfo.name}
                              className="w-full h-full object-cover"
                              fill
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/default-wallet-icon.png";
                              }}
                            />
                          </div>
                          {getWalletIcon(walletInfo)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3
                              className={`font-semibold truncate transition-colors duration-200
                              ${
                                walletInfo.installed
                                  ? "text-primary"
                                  : "text-text-secondary"
                              }
                              ${isHovered ? "text-highlight" : ""}
                            `}
                            >
                              {walletInfo.name}
                            </h3>
                          </div>

                          {/* Installation hint for non-installed wallets */}
                          {!walletInfo.installed && (
                            <p className="text-xs text-text-muted group-hover:text-text-tertiary transition-colors">
                              Click to install from{" "}
                              {new URL(walletInfo.url).hostname}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Status and loading */}
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <span
                          className={`text-xs font-medium transition-all duration-200 ${status.className}`}
                        >
                          {status.text}
                        </span>

                        {/* Loading spinner */}
                        {isConnecting && (
                          <div className="relative">
                            <div className="w-5 h-5 border-2 border-highlight/30 border-t-highlight rounded-full animate-spin"></div>
                            <div className="absolute inset-0 bg-highlight/20 rounded-full animate-ping"></div>
                          </div>
                        )}

                        {/* Arrow indicator */}
                        {!isConnecting && (
                          <div
                            className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200
                            ${
                              walletInfo.installed
                                ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background"
                                : "bg-surface-tertiary/30 text-text-tertiary group-hover:bg-highlight/20 group-hover:text-highlight"
                            }
                            ${isHovered ? "scale-110" : ""}
                          `}
                          >
                            <span className="text-xs">→</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with stats */}
        <div className="relative p-4 bg-gradient-to-r from-surface-elevated/30 to-surface-tertiary/30 border-t border-surface-tertiary/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-text-secondary">
                <span className="text-primary font-medium">
                  {displayWallets.filter((w) => w.installed).length}
                </span>{" "}
                of{" "}
                <span className="text-highlight font-medium">
                  {availableWallets.length}
                </span>{" "}
                wallets ready
              </span>
            </div>

            {!showAll && availableWallets.some((w) => !w.installed) && (
              <button
                onClick={() => setShowAll(true)}
                className="text-highlight hover:text-primary transition-colors font-medium
                           hover:bg-surface-elevated/50 px-2 py-1 rounded"
              >
                View {availableWallets.filter((w) => !w.installed).length} more
                →
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
