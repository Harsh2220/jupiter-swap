import LottieView from "lottie-react-native";
import React from "react";
import { Linking, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import useSwapStore from "@/src/store/swap";
import Button from "../UI/Button";
import { Heading } from "../UI/Heading";

function SwapSuccess() {
  const { txHash } = useSwapStore();
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
          source={require("../../assets/success.json")}
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
          }}
        >
          Transaction Confirmed
        </Heading>
        <Button
          onPress={() => {
            Linking.openURL(`https://solscan.io/tx/${txHash}`);
          }}
          style={{
            width: "100%",
          }}
        >
          View on explorer
        </Button>
      </View>
    </BottomSheetView>
  );
}

export default React.memo(SwapSuccess);
