import { useAppContext } from "@/contexts/AppContext";
import { ApiService } from "@/lib/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { AxiosError } from "axios";

export const useUser = () => {
  const { user, setUser } = useAppContext();
  const { connected, publicKey } = useWallet();
  
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", publicKey?.toBase58()],
    queryFn: async () => {
      if (!connected || !publicKey) {
        setUser(null);
        return null;
      }

      // Check if we have a refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token found, user not authenticated");
        setUser(null);
        return null;
      }

      try {
        const user = await ApiService.getInstance().getUser();
        if (user) {
          setUser(user);
        }
        return user;
      } catch (error: unknown) {
        console.error("Failed to fetch user:", error);
        // If authentication fails, clear the token
        if (error instanceof AxiosError && error.response?.status === 401) {
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
        return null;
      }
    },
    refetchInterval: 4000,
    enabled: connected && !!publicKey, // Only fetch when wallet is connected with public key
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  return { user: data || user, isLoading, error, setUser };
};
