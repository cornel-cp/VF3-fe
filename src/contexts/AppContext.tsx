import { User } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppProps {
  user: User | null;
}

const AppContext = createContext<AppProps>({ user: null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
