import { BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import { Heading } from "../UI/Heading";
import Button from "../UI/Button";

function SwapError() {
  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetView>
      <View
        style={{
          padding: 16,
          alignItems: "center",
          gap: 24,
        }}
      >
        <LottieView
          source={require("../../assets/error.json")}
          style={{
            width: 150,
            height: 150,
          }}
          autoPlay
          loop={false}
        />
        <Heading
          style={{
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          We are unable to process your transaction
        </Heading>
        <Button
          onPress={() => {
            dismiss();
          }}
          style={{
            width: "100%",
          }}
        >
          Close
        </Button>
      </View>
    </BottomSheetView>
  );
}

export default React.memo(SwapError);
