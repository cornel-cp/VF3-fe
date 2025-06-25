import { useAppContext } from "@/contexts/AppContext";
import { ApiService } from "@/lib/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";

export const useUser = () => {
  const { user, setUser } = useAppContext();
  const { connected } = useWallet();
  
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!connected) {
        setUser(null);
        return null;
      }
      const user = await ApiService.getInstance().getUser();
      if (user) {
        setUser(user);
      }
      return user;
    },
    refetchInterval: 2000,
    enabled: connected && !!user, // Only fetch when connected AND user exists
  });

  // If no user from context, return early values but still call all hooks
  if (!user) {
    return { user: null, isLoading: false, error: null, setUser };
  }

  return { user: userData, isLoading, error, setUser };
};
