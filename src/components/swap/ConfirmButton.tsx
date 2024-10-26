import React from "react";
import Button from "@/src/components/UI/Button";
import useWalletStore from "@/src/store/wallet";
import useSwapStore from "@/src/store/swap";
import { StyleSheet } from "react-native";

export default function ConfirmButton({ onPress }: { onPress: () => void }) {
  const { solBalance, tokens } = useWalletStore();
  const { inAmount, sellToken, buyToken } = useSwapStore();

  function handleCases() {
    if (!sellToken || !buyToken || !inAmount || solBalance < 0.002)
      return false;
    if (sellToken && buyToken) {
      if (tokens?.length === 0) return false;
    } else if (
      sellToken?.address === "So11111111111111111111111111111111111111112"
    ) {
      if (solBalance < parseInt(inAmount)) return false;
    } else {
      const token = tokens?.find(
        (token) => token?.address === sellToken?.address
      );

      if (!token || token?.balance < parseFloat(inAmount)) return false;
    }
    return true;
  }

  function getDynamicTitle(): String {
    if (solBalance < 0.002) return "Insufficient SOL";
    if (sellToken && buyToken) {
      if (tokens?.length === 0) return "Insufficient balance";
      else if (
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

  return (
    <Button onPress={onPress} disabled={!handleCases()} style={styles.button}>
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
