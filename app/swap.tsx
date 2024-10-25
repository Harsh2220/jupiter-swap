import SwapConfirmSheet from "@/src/components/swap/SwapConfirmSheet";
import Buy from "@/src/components/swap/Buy";
import Sell from "@/src/components/swap/Sell";
import SwapDivider from "@/src/components/swap/Divider";
import Button from "@/src/components/UI/Button";
import Container from "@/src/components/UI/Container";
import Sheet from "@/src/components/UI/Sheet";
import useSwapStore from "@/src/store/swap";
import useWalletStore from "@/src/store/wallet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { ScrollView, View } from "react-native";

export default function Swap() {
  const { inAmount, setError, setTxHash } = useSwapStore();
  const swapRef = useRef<BottomSheetModal>(null);

  function handleCases() {
    if (!inAmount) return false;
    return true;
  }

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
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          marginBottom: 32,
          opacity: handleCases() ? 1 : 0.7,
        }}
      >
        Confirm
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
