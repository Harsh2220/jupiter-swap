import { black, white } from "@/src/constants/colors";
import { BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DoubleArrowRight from "@/src/assets/icons/DoubleArrowRight";
import useSwapStore from "@/src/store/swap";
import useSwap from "@/src/hooks/useSwap";
import { Heading } from "../UI/Heading";
import { Paragraph } from "../UI/Paragraph";
import Button from "../UI/Button";
import { getColors } from "react-native-image-colors";

export default function SwapConfirm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    buyToken,
    sellToken,
    inAmount,
    outAmount,
    gasFees,
    setError,
    setTxHash,
  } = useSwapStore();
  const { executeSwap } = useSwap();
  const { dismiss } = useBottomSheetModal();

  const DATA = [
    {
      title: "You are selling",
      value: `${inAmount} ${sellToken?.symbol}`,
    },
    {
      title: "You will receive",
      value: `~ ${outAmount} ${buyToken?.symbol}`,
    },
    {
      title: "Estimated gas fees",
      value: `$${gasFees}`,
    },
  ];

  async function handleSwap() {
    try {
      setIsLoading(true);
      setError(false);
      setTxHash(null);
      await executeSwap();
    } catch (error) {
      console.log("error in executeswap", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <BottomSheetView>
      <View style={styles.container}>
        <Heading style={styles.transactionAmount}>Transaction Preview</Heading>
        <View style={styles.tokensContainer}>
          <TokenPreview source={true} />
          <View style={styles.doubleArrowRightIconContainer}>
            <DoubleArrowRight width={20} height={20} color={white[200]} />
          </View>
          <TokenPreview source={false} />
        </View>
        <View style={styles.feesPreviewContainer}>
          <Heading style={styles.feesPreviewTitle}>Fees Preview</Heading>
          <View style={styles.dataContainter}>
            {DATA.map((el, index) => (
              <View key={index} style={styles.singleRawDataContainer}>
                <Paragraph style={styles.dataTitle}>{el.title}</Paragraph>
                <Heading style={styles.dataValue}>{el.value}</Heading>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          {!isLoading && (
            <Button
              style={{
                backgroundColor: "#EDEFF2",
                borderColor: white[800],
                width: "48%",
              }}
              textStyle={{
                color: black[800],
              }}
              size="small"
              onPress={() => {
                dismiss();
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            isLoading={isLoading}
            style={{
              width: isLoading ? "100%" : "48%",
            }}
            size="small"
            onPress={handleSwap}
          >
            Confirm
          </Button>
        </View>
      </View>
    </BottomSheetView>
  );
}

function TokenPreview({ source }: { source: boolean }) {
  const { inAmount, outAmount, buyToken, sellToken } = useSwapStore();
  const [bgColor, setBgColor] = React.useState(white[400]);

  React.useEffect(() => {
    const url = source ? sellToken?.logoURI : buyToken?.logoURI;
    getColors(url!, {
      fallback: "#EDEFF2",
      cache: true,
      key: url,
    }).then((data: any) => {
      setBgColor(data.background);
    });
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        backgroundColor: `${bgColor}30`,
        borderRadius: 20,
        width: "48%",
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{ uri: source ? sellToken?.logoURI : buyToken?.logoURI }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 36,
          }}
          contentFit="cover"
        />
      </View>
      <View
        style={{
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading
          style={{
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {source ? sellToken?.name : buyToken?.name}
        </Heading>
        <Paragraph
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#9B9B9B",
          }}
        >
          {source ? inAmount : outAmount}{" "}
          {source ? sellToken?.symbol : buyToken?.symbol}
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginTop: 16,
  },
  assetName: {
    fontSize: 20,
    fontWeight: "700",
  },
  assetBalance: {
    fontWeight: "600",
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
  doubleArrowRightIconContainer: {
    backgroundColor: "white",
    marginHorizontal: -12,
    zIndex: 1,
    borderRadius: 16,
    padding: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  feesPreviewContainer: {
    borderRadius: 16,
    backgroundColor: "#EDEFF2",
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: "100%",
    marginTop: 16,
    paddingBottom: 18,
  },
  feesPreviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  dataContainter: {
    marginTop: 14,
    gap: 8,
  },
  singleRawDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataTitle: {
    color: black[200],
    fontSize: 12,
    fontWeight: "500",
  },
  dataValue: {
    fontSize: 12,
    fontWeight: "700",
    color: black[800],
  },
});
