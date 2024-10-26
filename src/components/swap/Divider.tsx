import SwapIcon from "@/src/assets/icons/SwapIcon";
import { black, white } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

function SwapDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.iconContainer}>
        <SwapIcon
          width={24}
          height={24}
          color={black[800]}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

export default React.memo(SwapDivider);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    position: "relative",
    height: 24,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: white[500],
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 24,
    backgroundColor: white[800],
  },
});
