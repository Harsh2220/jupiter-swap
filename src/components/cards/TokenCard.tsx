import { Heading } from "@/src/components/UI/Heading";
import { JupToken } from "@/src/types/wallet";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph } from "../UI/Paragraph";
import { white } from "@/src/constants/colors";

export default function TokenCard({ token }: { token: JupToken }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: token?.logoURI }} style={styles.assetImage} />
      <View>
        <Heading style={styles.assetName} numberOfLines={1}>
          {token?.name}
        </Heading>
        <Paragraph style={styles.assetSymbol}>{token?.symbol}</Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  assetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  assetName: {
    fontSize: 18,
    fontWeight: "700",
  },
  assetSymbol: {
    fontSize: 12,
    fontWeight: "500",
    color: white[100],
  },
});
