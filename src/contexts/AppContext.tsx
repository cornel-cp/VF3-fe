import { User } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface AppProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; 
}

const AppContext = createContext<AppProps>({ user: null, setUser: () => {} });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
