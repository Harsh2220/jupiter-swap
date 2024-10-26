import { create } from "zustand";
import { IToken, JupToken, Wallet } from "@/src/types/wallet";
import { Token } from "@/src/types/shyft";

interface IWallet {
    currentWallet: null | Wallet;
    wallets: null | Wallet[];
    tokens: null | Token[];
    jupTokens: null | JupToken[]
    solBalance: number;
    setCurrentWallet: (wallet: Wallet) => void;
    setWallets: (wallets: Wallet[]) => void;
    setTokens: (tokens: Token[] | null) => void
    setSolBalance: (solBalance: number) => void
    setJupTokens: (jupTokens: JupToken[]) => void
}

const useWalletStore = create<IWallet>((set) => ({
    currentWallet: null,
    tokens: null,
    wallets: null,
    solBalance: 0,
    jupTokens: null,
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
    setJupTokens: (jupTokens) =>
        set({
            jupTokens: jupTokens,
        }),
}));

export default useWalletStore;