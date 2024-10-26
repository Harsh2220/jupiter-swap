import LottieView from "lottie-react-native";
import React, { useCallback } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import useSwapStore from "@/src/store/swap";
import Button from "../UI/Button";
import { Heading } from "../UI/Heading";

function SwapSuccess() {
  const txHash = useSwapStore((state) => state.txHash);

  const handleViewOnExplorer = useCallback(() => {
    Linking.openURL(`https://solscan.io/tx/${txHash}`);
  }, []);

  return (
    <BottomSheetView>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/success.json")}
          style={styles.lottie}
          autoPlay
          loop={false}
        />
        <Heading style={styles.title}>Transaction Confirmed</Heading>
        <Button onPress={handleViewOnExplorer} style={styles.button}>
          View on explorer
        </Button>
      </View>
    </BottomSheetView>
  );
}

export default React.memo(SwapSuccess);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    gap: 24,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    width: "100%",
  },
});
