import { createContext, useContext, useState, ReactNode } from "react";

const wallets = [
  { id: "metamask", name: "MetaMask", icon: "🦊", color: "45 90% 55%" },
  { id: "base", name: "Base Wallet", icon: "🔵", color: "220 80% 55%" },
];

type WalletContextType = {
  connected: string | null;
  address: string;
  wallets: typeof wallets;
  connectedWallet: typeof wallets[0] | undefined;
  connect: (walletId: string) => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState<string | null>(null);
  const [address, setAddress] = useState("");

  const connect = (walletId: string) => {
    setConnected(walletId);
    setAddress(walletId === "metamask" ? "0x7F2c...aE41" : "0xB3d1...9c82");
  };

  const disconnect = () => {
    setConnected(null);
    setAddress("");
  };

  const connectedWallet = wallets.find((w) => w.id === connected);

  return (
    <WalletContext.Provider value={{ connected, address, wallets, connectedWallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
