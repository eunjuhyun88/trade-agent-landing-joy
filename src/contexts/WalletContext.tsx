import { createContext, useContext, useState, ReactNode, useCallback } from "react";

const wallets = [
  { id: "metamask", name: "MetaMask", icon: "🦊", color: "45 90% 55%" },
  { id: "base", name: "Base Wallet", icon: "🔵", color: "220 80% 55%" },
];

export type TradeRecord = {
  type: "BUY" | "SELL" | "SWAP";
  asset: string;
  amount: string;
  price: string;
  time: string;
  status: string;
  toAsset?: string;
  toAmount?: string;
};

export type SubscriptionPlan = "FREE" | "PRO MONTHLY" | "PRO YEARLY" | null;

type WalletContextType = {
  connected: string | null;
  address: string;
  wallets: typeof wallets;
  connectedWallet: typeof wallets[0] | undefined;
  connect: (walletId: string) => void;
  disconnect: () => void;
  trades: TradeRecord[];
  addTrade: (trade: TradeRecord) => void;
  subscription: SubscriptionPlan;
  subscribe: (plan: SubscriptionPlan) => void;
  chatCount: number;
  maxFreeChats: number;
  incrementChat: () => boolean;
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
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionPlan>(null);
  const [chatCount, setChatCount] = useState(0);
  const maxFreeChats = 5;

  const connect = (walletId: string) => {
    setConnected(walletId);
    setAddress(walletId === "metamask" ? "0x7F2c...aE41" : "0xB3d1...9c82");
  };

  const disconnect = () => {
    setConnected(null);
    setAddress("");
  };

  const addTrade = useCallback((trade: TradeRecord) => {
    setTrades((prev) => [trade, ...prev]);
  }, []);

  const subscribe = useCallback((plan: SubscriptionPlan) => {
    setSubscription(plan);
  }, []);

  const incrementChat = useCallback(() => {
    if (subscription && subscription !== "FREE") return true;
    if (chatCount >= maxFreeChats) return false;
    setChatCount((prev) => prev + 1);
    return true;
  }, [subscription, chatCount, maxFreeChats]);

  const connectedWallet = wallets.find((w) => w.id === connected);

  return (
    <WalletContext.Provider value={{ connected, address, wallets, connectedWallet, connect, disconnect, trades, addTrade, subscription, subscribe, chatCount, maxFreeChats, incrementChat }}>
      {children}
    </WalletContext.Provider>
  );
};
