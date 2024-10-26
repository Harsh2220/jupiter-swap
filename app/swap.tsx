import Container from "@/src/components/UI/Container";
import Sheet from "@/src/components/UI/Sheet";
import Buy from "@/src/components/swap/Buy";
import ConfirmButton from "@/src/components/swap/ConfirmButton";
import SwapDivider from "@/src/components/swap/Divider";
import Sell from "@/src/components/swap/Sell";
import SwapConfirmSheet from "@/src/components/swap/SwapConfirmSheet";
import useSwapStore from "@/src/store/swap";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Swap() {
  const swapRef = useRef<BottomSheetModal>(null);
  const setError = useSwapStore((state) => state.setError);
  const setTxHash = useSwapStore((state) => state.setTxHash);

  const handleConfirmSwap = useCallback(() => {
    setError(false);
    setTxHash(null);
    swapRef.current?.present();
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.actionsContainer}>
          <Sell />
          <SwapDivider />
          <Buy />
        </View>
      </ScrollView>
      <ConfirmButton onPress={handleConfirmSwap} />
      <Sheet
        style={styles.sheetStyle}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  actionsContainer: {
    gap: 16,
  },
  sheetStyle: {
    margin: 16,
  },
});
