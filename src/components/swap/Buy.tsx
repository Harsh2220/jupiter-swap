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
import { TextInput, TouchableOpacity, View } from "react-native";
import Sheet from "@/src/components/UI/Sheet";
import TokenSheet from "@/src/components/swap/TokenSheet";

export default function Buy() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["60%", "90%"], []);
  const { buyToken, outAmount, inAmount, sellToken } = useSwapStore();
  const { quote } = useSwap();

  const { data } = useQuery({
    queryKey: ["swap-quote", sellToken, buyToken, inAmount],
    queryFn: () => quote(),
    enabled: inAmount.length > 0 && sellToken !== null && buyToken !== null,
  });

  return (
    <>
      <View>
        <Paragraph
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: white[200],
          }}
        >
          Your are Buying
        </Paragraph>
        <View
          style={{
            borderRadius: 32,
            marginTop: 8,
            borderWidth: 1,
            borderColor: white[500],
            backgroundColor: "#F1F3F4",
            padding: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: white[800],
              borderWidth: 1,
              borderColor: white[500],
              borderRadius: 100,
            }}
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: !buyToken ? 6 : 0,
              }}
            >
              {buyToken?.logoURI && (
                <Image
                  source={{ uri: buyToken.logoURI }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                  }}
                  contentFit="cover"
                />
              )}
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Heading
                  style={{
                    fontSize: 16,
                    lineHeight: 16,
                    fontWeight: "600",
                  }}
                >
                  {buyToken ? buyToken.name : "Select Token"}
                </Heading>
                {buyToken && (
                  <Paragraph
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: white[100],
                    }}
                  >
                    {buyToken?.symbol}
                  </Paragraph>
                )}
              </View>
            </View>
            <ChevronDown width={24} height={24} color={"black"} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              marginVertical: 24,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              value={outAmount}
              editable={false}
              textAlignVertical="center"
              textAlign="center"
              style={{
                width: "100%",
                textAlign: "center",
                paddingVertical: 0,
                fontSize: 58,
                fontWeight: "600",
                fontFamily: "SF_Semibold",
                maxHeight: 78,
              }}
              placeholderTextColor={white[200]}
              placeholder="00"
            />
          </View>
        </View>
      </View>
      <Sheet ref={bottomSheetModalRef} snapPoints={snapPoints}>
        <TokenSheet isBuyToken={true} />
      </Sheet>
    </>
  );
}
