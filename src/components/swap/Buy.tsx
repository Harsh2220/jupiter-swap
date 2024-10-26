import ChevronDown from "@/src/assets/icons/ChevronDown";
import { Heading } from "@/src/components/UI/Heading";
import { Paragraph } from "@/src/components/UI/Paragraph";
import { white } from "@/src/constants/colors";
import useSwap from "@/src/hooks/useSwap";
import useSwapStore from "@/src/store/swap";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Sheet from "@/src/components/UI/Sheet";
import TokenSheet from "@/src/components/swap/TokenSheet";

export default function Buy() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["90%"], []);
  const buyToken = useSwapStore((state) => state.buyToken);
  const outAmount = useSwapStore((state) => state.outAmount);
  const inAmount = useSwapStore((state) => state.inAmount);
  const sellToken = useSwapStore((state) => state.sellToken);
  const { quote } = useSwap();

  const { data } = useQuery({
    queryKey: ["swap-quote", sellToken, buyToken, inAmount],
    queryFn: () => quote(),
    enabled: inAmount.length > 0 && sellToken !== null && buyToken !== null,
  });

  return (
    <>
      <View>
        <Paragraph style={styles.title}>Your are Buying</Paragraph>
        <View style={styles.mainBox}>
          <TouchableOpacity
            style={styles.dropdownMain}
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
          >
            <View style={styles.tokenContainer}>
              {buyToken?.logoURI && (
                <Image
                  source={{ uri: buyToken.logoURI }}
                  style={styles.tokenImage}
                  contentFit="cover"
                />
              )}
              {!buyToken ? (
                <Heading style={styles.selectTokenTitle}>Select Token</Heading>
              ) : (
                <View style={styles.tokenDataContainer}>
                  <Heading style={styles.tokenName}>{buyToken.name}</Heading>
                  <Paragraph style={styles.tokenSymbol}>
                    {buyToken?.symbol}
                  </Paragraph>
                </View>
              )}
            </View>
            <ChevronDown width={24} height={24} color={"black"} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="decimal-pad"
              value={outAmount}
              editable={false}
              textAlignVertical="center"
              textAlign="center"
              style={styles.input}
              placeholderTextColor={white[200]}
              placeholder="00"
            />
          </View>
        </View>
      </View>
      <Sheet
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <TokenSheet isBuyToken={true} />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: white[200],
  },
  mainBox: {
    borderRadius: 32,
    marginTop: 8,
    borderWidth: 1,
    borderColor: white[500],
    backgroundColor: "#F1F3F4",
    padding: 8,
  },
  dropdownMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: white[800],
    borderWidth: 1,
    borderColor: white[500],
    borderRadius: 100,
  },
  tokenContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tokenImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  selectTokenTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  tokenDataContainer: {
    marginLeft: 6,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: "600",
  },
  tokenSymbol: {
    fontSize: 12,
    fontWeight: "500",
    color: white[100],
  },
  inputContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  input: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 0,
    fontSize: 58,
    fontWeight: "600",
    fontFamily: "SF_Semibold",
    maxHeight: 78,
  },
});
