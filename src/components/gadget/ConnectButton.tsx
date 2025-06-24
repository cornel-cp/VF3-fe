import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../ui/Button";
import { useConnectWalletModal } from "@/hooks/useConnectWalletModal";
import { useUser } from "@/hooks/useUser";
import { useCallback, useEffect, useState, useRef } from "react";
import { ApiService } from "@/lib/ApiService";
import { useAppContext } from "@/contexts/AppContext";
import bs58 from "bs58";
import { ChevronDown, Edit3, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatWalletAddress } from "@/utils/format";

export const ConnectButton = () => {
  const router = useRouter();
  const { openWalletModal, isConnected } = useConnectWalletModal();
  const { disconnect, connected, publicKey, signMessage } = useWallet();
  const { user, setUser } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initAuth = useCallback(async () => {
    if (!signMessage) return;
    try {
      const res = await ApiService.getInstance().initAuth(
        publicKey?.toBase58() || ""
      );
      if (res.success) {
        const { message } = res;
        const signedMessage = await signMessage(
          new TextEncoder().encode(message)
        );
        const res2 = await ApiService.getInstance().veryfySignature(
          publicKey?.toBase58() || "",
          bs58.encode(signedMessage)
        );
        if (res2.success) {
          setUser(res2.data);
          localStorage.setItem("accessToken", res2.accessToken);
          localStorage.setItem("refreshToken", res2.refreshToken);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [publicKey, signMessage, setUser]);

  const signIn = useCallback(async () => {
    if (!signMessage || !publicKey) return;
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const storedWalletAddress = localStorage.getItem("walletAddress");
      const currentWalletAddress = publicKey.toBase58();

      // Only use refresh token if it belongs to the current wallet
      if (refreshToken && storedWalletAddress === currentWalletAddress) {
        const res = await ApiService.getInstance().refreshToken(refreshToken);
        if (res.success) {
          setUser(res.user);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          return;
        }
      }

      // If refresh token is invalid or belongs to different wallet, do full sign in
      const res = await ApiService.getInstance().initSignIn(currentWalletAddress);
      if (res.success) {
        const { message } = res;
        const signedMessage = await signMessage(
          new TextEncoder().encode(message)
        );
        const res2 = await ApiService.getInstance().signIn(
          currentWalletAddress,
          bs58.encode(signedMessage)
        );
        if (res2.success) {
          setUser(res2.user);
          localStorage.setItem("accessToken", res2.accessToken);
          localStorage.setItem("refreshToken", res2.refreshToken);
          localStorage.setItem("walletAddress", currentWalletAddress);
        }
      }
    } catch (error) {
      initAuth();
    }
  }, [publicKey, signMessage, initAuth, setUser]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("walletAddress");
    setUser(null);
    disconnect();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (connected && publicKey) signIn();
  }, [signIn, connected, publicKey]);

  // Update the wallet change effect to also clear walletAddress
  useEffect(() => {
    if (!publicKey) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("walletAddress");
      setUser(null);
    }
  }, [publicKey, setUser]);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        className="flex items-center space-x-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{user?.name || formatWalletAddress(publicKey?.toBase58() || "", 4, 2)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-primary/20 bg-surface-primary shadow-lg overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => {
                // Handle edit profile
                setIsDropdownOpen(false);
                router.push("/profile");
              }}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary w-full text-left"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-surface-secondary w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
