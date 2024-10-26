import { BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../UI/Heading";
import Button from "../UI/Button";

function SwapError() {
  const { dismiss } = useBottomSheetModal();

  const handleClose = useCallback(() => {
    dismiss();
  }, []);

  return (
    <BottomSheetView>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/error.json")}
          style={styles.lottie}
          autoPlay
          loop={false}
        />
        <Heading style={styles.title}>
          We are unable to process your transaction
        </Heading>
        <Button onPress={handleClose} style={styles.button}>
          Close
        </Button>
      </View>
    </BottomSheetView>
  );
}

export default React.memo(SwapError);

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
