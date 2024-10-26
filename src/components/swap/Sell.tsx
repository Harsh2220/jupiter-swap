import ChevronDown from "@/src/assets/icons/ChevronDown";
import { Heading } from "@/src/components/UI/Heading";
import { Paragraph } from "@/src/components/UI/Paragraph";
import Sheet from "@/src/components/UI/Sheet";
import TokenSheet from "@/src/components/swap/TokenSheet";
import { white } from "@/src/constants/colors";
import useSwapStore from "@/src/store/swap";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Sell() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["90%"], []);
  const sellToken = useSwapStore((state) => state.sellToken);
  const setInAmount = useSwapStore((state) => state.setInAmount);

  return (
    <>
      <View>
        <Paragraph style={styles.title}>Your are Selling</Paragraph>
        <View style={styles.mainBox}>
          <TouchableOpacity
            style={styles.dropdownMain}
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
          >
            <View style={styles.tokenContainer}>
              {sellToken?.logoURI && (
                <Image
                  source={{ uri: sellToken.logoURI }}
                  style={styles.tokenImage}
                  contentFit="cover"
                />
              )}
              {!sellToken ? (
                <Heading style={styles.selectTokenTitle}>Select Token</Heading>
              ) : (
                <View style={styles.tokenDataContainer}>
                  <Heading style={styles.tokenName}>{sellToken.name}</Heading>
                  <Paragraph style={styles.tokenSymbol}>
                    {sellToken?.symbol}
                  </Paragraph>
                </View>
              )}
            </View>
            <ChevronDown width={24} height={24} color={"black"} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="numeric"
              textAlignVertical="center"
              textAlign="center"
              onChangeText={(text) => setInAmount(text)}
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
        <TokenSheet isBuyToken={false} />
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
