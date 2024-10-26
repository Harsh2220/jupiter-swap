import SearchIcon from "@/src/assets/icons/SearchIcon";
import { Heading } from "@/src/components/UI/Heading";
import TokenCard from "@/src/components/cards/TokenCard";
import { white } from "@/src/constants/colors";
import useSwapStore from "@/src/store/swap";
import useWalletStore from "@/src/store/wallet";
import { JupToken } from "@/src/types/wallet";
import { BottomSheetFlatList, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TokenSheet({ isBuyToken }: { isBuyToken: boolean }) {
  const { dismiss } = useBottomSheetModal();
  const { jupTokens } = useWalletStore();
  const { setBuyToken, setSellToken, sellToken, buyToken } = useSwapStore();
  const [searchItem, setSearchItem] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<JupToken[] | null>(
    jupTokens
  );

  const renderItem = ({ item }: { item: JupToken }) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          if (isBuyToken) {
            if (sellToken === item) {
              setSellToken(buyToken!);
              setBuyToken(item);
            } else {
              setBuyToken(item);
            }
          } else {
            if (buyToken === item) {
              setBuyToken(sellToken!);
              setSellToken(item);
            } else {
              setSellToken(item);
            }
          }
          dismiss();
        }}
      >
        <TokenCard token={item} />
      </TouchableOpacity>
    );
  };

  const emptyListComponent = () => {
    return <Heading style={styles.emptyListHeader}>No tokens found</Heading>;
  };

  const handleInputChange = (e: { nativeEvent: { text: string } }) => {
    const searchTerm = e.nativeEvent.text;
    setSearchItem(searchTerm);
    if (!jupTokens) return;
    const filteredItems = jupTokens.filter((token: JupToken) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filteredItems);
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.heading}>Choose Token</Heading>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={white[300]}
          onChange={handleInputChange}
        />
        <SearchIcon width={24} height={24} color={white[300]} />
      </View>
      <BottomSheetFlatList
        data={filteredTokens}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item: JupToken) => item.address.toString()}
        renderItem={renderItem}
        ListEmptyComponent={emptyListComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  contentContainerStyle: {
    gap: 16,
  },
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
  emptyListHeader: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: white[200],
  },
});
