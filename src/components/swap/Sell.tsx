import Button from "@/src/components/UI/Button";
import { Heading } from "@/src/components/UI/Heading";
import { Paragraph } from "@/src/components/UI/Paragraph";
import { white } from "@/src/constants/colors";
import useSwapStore from "@/src/store/swap";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Sheet from "@/src/components/UI/Sheet";
import ChevronDown from "@/src/assets/icons/ChevronDown";
import TokenSheet from "@/src/components/swap/TokenSheet";

export default function Sell() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["60%", "90%"], []);
  const { inAmount, sellToken, setInAmount } = useSwapStore();

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
          Your are Selling
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
                paddingVertical: !sellToken ? 6 : 0,
              }}
            >
              {sellToken?.logoURI && (
                <Image
                  source={{ uri: sellToken.logoURI }}
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
                  {sellToken ? sellToken.name : "Select Token"}
                </Heading>
                {sellToken && (
                  <Paragraph
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: white[100],
                    }}
                  >
                    {sellToken?.symbol}
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
              keyboardType="numeric"
              textAlignVertical="center"
              textAlign="center"
              onChangeText={(text) => setInAmount(text)}
              style={{
                width: "100%",
                fontSize: 58,
                paddingVertical: 0,
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
        <TokenSheet isBuyToken={false} />
      </Sheet>
    </>
  );
}
