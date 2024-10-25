import SearchIcon from "@/src/assets/icons/SearchIcon";
import { white } from "@/src/constants/colors";
import useSwapStore from "@/src/store/swap";
import { JupToken } from "@/src/types/wallet";
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Heading } from "@/src/components/UI/Heading";
import TokenCard from "../cards/TokenCard";
import { useQuery } from "@tanstack/react-query";
import getTokens from "@/src/utils/getTokens";

export default function TokenSheet({ isBuyToken }: { isBuyToken: boolean }) {
  const { data: tokens } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => getTokens(),
  });
  const { dismiss } = useBottomSheetModal();
  const { setBuyToken, setSellToken } = useSwapStore();
  const [searchItem, setSearchItem] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<JupToken[] | null>(
    tokens
  );

  const renderItem = ({ item }: { item: JupToken }) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          if (isBuyToken) {
            setBuyToken(item);
          } else {
            setSellToken(item);
          }
          dismiss();
        }}
      >
        <TokenCard token={item} />
      </TouchableOpacity>
    );
  };

  const handleInputChange = (e: { nativeEvent: { text: string } }) => {
    const searchTerm = e.nativeEvent.text;
    setSearchItem(searchTerm);
    if (!tokens) return;
    const filteredItems = tokens.filter((token: JupToken) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filteredItems);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 16,
      }}
    >
      <Heading style={styles.heading}>Choose Token</Heading>
      <View style={styles.inputContainer}>
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={white[300]}
          onChange={handleInputChange}
        />
        <SearchIcon width={24} height={24} color={white[300]} />
      </View>
      <BottomSheetFlatList
        data={filteredTokens}
        contentContainerStyle={{
          gap: 16,
        }}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: white[600],
    borderRadius: 40,
    paddingLeft: 12,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    fontWeight: "600",
  },
});