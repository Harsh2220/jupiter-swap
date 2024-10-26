import Button from "@/src/components/UI/Button";
import Container from "@/src/components/UI/Container";
import Sheet from "@/src/components/UI/Sheet";
import Buy from "@/src/components/swap/Buy";
import SwapDivider from "@/src/components/swap/Divider";
import Sell from "@/src/components/swap/Sell";
import SwapConfirmSheet from "@/src/components/swap/SwapConfirmSheet";
import useSwapStore from "@/src/store/swap";
import useWalletStore from "@/src/store/wallet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { ScrollView, View } from "react-native";

export default function Swap() {
  const { solBalance, tokens, currentWallet } = useWalletStore();
  const { inAmount, setError, setTxHash, sellToken, buyToken } = useSwapStore();
  const swapRef = useRef<BottomSheetModal>(null);

  function handleCases() {
    if (!sellToken || !buyToken || !inAmount || solBalance < 0.02) return false;
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
    if (solBalance < 0.02) return "Insufficient SOL";
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

  console.log(currentWallet?.publicKey, currentWallet?.secretKey);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 16,
          }}
        >
          <Sell />
          <SwapDivider />
          <Buy />
        </View>
      </ScrollView>
      <Button
        onPress={() => {
          setError(false);
          setTxHash(null);
          swapRef.current?.present();
        }}
        disabled={!handleCases()}
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          marginBottom: 32,
        }}
      >
        {getDynamicTitle()}
      </Button>
      <Sheet
        style={{
          margin: 16,
        }}
        ref={swapRef}
        enableDynamicSizing
        detached={true}
        bottomInset={50}
      >
        <SwapConfirmSheet />
      </Sheet>
    </Container>
  );
}
