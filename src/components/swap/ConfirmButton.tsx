import React, { useEffect } from "react";
import Button from "@/src/components/UI/Button";
import useWalletStore from "@/src/store/wallet";
import useSwapStore from "@/src/store/swap";
import { StyleSheet } from "react-native";

export default function ConfirmButton({ onPress }: { onPress: () => void }) {
  const { solBalance, tokens } = useWalletStore();
  const inAmount = useSwapStore((state) => state.inAmount);
  const sellToken = useSwapStore((state) => state.sellToken);
  const buyToken = useSwapStore((state) => state.buyToken);

  function handleCases() {
    if (!sellToken || !buyToken || !inAmount || solBalance < 0.002)
      return false;
    if (sellToken && buyToken) {
      if (
        sellToken?.address === "So11111111111111111111111111111111111111112"
      ) {
        if (solBalance < parseInt(inAmount)) return false;
      } else {
        const token = tokens?.find(
          (token) => token?.address === sellToken?.address
        );

        if (!token || token?.balance < parseFloat(inAmount)) return false;
      }
    }
    return true;
  }

  function getDynamicTitle(): String {
    if (solBalance < 0.002) return "Insufficient SOL";
    if (sellToken && buyToken) {
      if (
        sellToken?.address === "So11111111111111111111111111111111111111112"
      ) {
        if (solBalance < parseInt(inAmount)) return "Insufficient balance";
      } else {
        const token = tokens?.find(
          (token) => token?.address === sellToken?.address
        );
        if (!token || token?.balance < parseFloat(inAmount))
          return "Insufficient balance";
      }
    }
    return "Confirm";
  }

  const data = handleCases();

  return (
    <Button onPress={onPress} disabled={!data} style={styles.button}>
      {getDynamicTitle()}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
