import { IToken, JupToken } from "@/src/types/wallet";
import { create } from "zustand";

interface ISwapStore {
    inAmount: string;
    outAmount: string;
    txHash: string | null;
    error: boolean;
    gasFees: number;
    sellToken: null | JupToken;
    buyToken: null | JupToken;
    setInAmount: (inAmount: string) => void;
    setOutAmount: (outAmount: string) => void;
    setError: (error: boolean) => void;
    setGasFees: (gasFees: number) => void;
    setTxHash: (txHash: string | null) => void;
    setBuyToken: (buyToken: JupToken) => void;
    setSellToken: (sellToken: JupToken) => void;
}

const useSwapStore = create<ISwapStore>((set) => ({
    inAmount: "",
    outAmount: "",
    txHash: null,
    error: false,
    gasFees: 0,
    sellToken: null,
    buyToken: null,
    setInAmount: (inAmount) => set({ inAmount }),
    setOutAmount: (outAmount) => set({ outAmount }),
    setError: (error) => set({ error }),
    setGasFees: (gasFees) => set({ gasFees }),
    setTxHash: (txHash) => set({ txHash }),
    setBuyToken: (buyToken) => set({ buyToken }),
    setSellToken: (sellToken) => set({ sellToken }),
}));

export default useSwapStore;