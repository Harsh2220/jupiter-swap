import { create } from "zustand";
import { IToken, Wallet } from "@/src/types/wallet";

interface IWallet {
    currentWallet: null | Wallet;
    wallets: null | Wallet[];
    tokens: null | IToken[];
    setCurrentWallet: (wallet: Wallet) => void;
    setWallets: (wallets: Wallet[]) => void;
    setTokens: (tokens: IToken[] | null) => void
}

const useWalletStore = create<IWallet>((set) => ({
    currentWallet: null,
    tokens: null,
    wallets: null,
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
}));

export default useWalletStore;