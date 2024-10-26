import { white } from "@/src/constants/colors";
import { storage } from "@/src/lib/storage";
import useWalletStore from "@/src/store/wallet";
import { STORAGE_KEYS } from "@/src/types/storage";
import getPortfolio from "@/src/utils/getPortfolio";
import getTokens from "@/src/utils/getTokens";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Loader() {
  const router = useRouter();
  const {
    setWallets,
    setCurrentWallet,
    setTokens,
    setSolBalance,
    setJupTokens,
  } = useWalletStore();

  async function handleWallets() {
    try {
      const wallets = storage.getString(STORAGE_KEYS.WALLETS);
      if (wallets === "null" || wallets === undefined) {
        router.replace("/create");
      } else {
        setWallets(JSON.parse(wallets));
        setCurrentWallet(JSON.parse(wallets)[0]);
        const [portfolio, jupTokens] = await Promise.all([
          getPortfolio(JSON.parse(wallets)[0].publicKey),
          getTokens(),
        ]);
        if (portfolio?.result) {
          if (portfolio?.result?.sol_balance) {
            setSolBalance(portfolio?.result?.sol_balance);
          }
          setTokens(portfolio?.result?.tokens);
        }
        setJupTokens(jupTokens);
        router.replace("/swap");
      }
    } catch (error) {
      console.log("loader", error);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      handleWallets();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../src/assets/loader.json")}
        style={styles.lottie}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white[800],
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
