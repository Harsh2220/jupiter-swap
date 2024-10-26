import { create } from "zustand";
import { IToken, Wallet } from "@/src/types/wallet";
import { Token } from "@/src/types/shyft";

interface IWallet {
    currentWallet: null | Wallet;
    wallets: null | Wallet[];
    tokens: null | Token[];
    solBalance: number;
    setCurrentWallet: (wallet: Wallet) => void;
    setWallets: (wallets: Wallet[]) => void;
    setTokens: (tokens: Token[] | null) => void
    setSolBalance: (solBalance: number) => void
}

const useWalletStore = create<IWallet>((set) => ({
    currentWallet: null,
    tokens: null,
    wallets: null,
    solBalance: 0,
    setCurrentWallet: (currentWallet) =>
        set({
            currentWallet: currentWallet,
        }),
    setWallets: (wallets) =>
        set({
            wallets: wallets,
        }),
    setTokens: (tokens) =>
        set({
            tokens: tokens,
        }),
    setSolBalance: (solBalance) =>
        set({
            solBalance: solBalance,
        }),
}));

export default useWalletStore;