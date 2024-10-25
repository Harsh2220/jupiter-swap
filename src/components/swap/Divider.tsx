import SwapIcon from "@/src/assets/icons/SwapIcon";
import { black, white } from "@/src/constants/colors";
import React from "react";
import { View } from "react-native";

function SwapDivider() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        position: "relative",
        height: 24,
      }}
    >
      <View style={{ height: 1, width: "100%", backgroundColor: white[500] }} />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwapIcon
          width={24}
          height={24}
          color={black[800]}
          style={{
            paddingHorizontal: 24,
            backgroundColor: white[800],
          }}
        />
      </View>
    </View>
  );
}

export default React.memo(SwapDivider);
