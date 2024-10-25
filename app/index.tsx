import { white } from "@/src/constants/colors";
import { storage } from "@/src/lib/storage";
import useWalletStore from "@/src/store/wallet";
import { STORAGE_KEYS } from "@/src/types/storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Loader() {
  const router = useRouter();
  const { setWallets, setCurrentWallet, setTokens } = useWalletStore();

  async function handleWallets() {
    try {
      const wallets = storage.getString(STORAGE_KEYS.WALLETS);
      if (wallets === "null" || wallets === undefined) {
        router.replace("/create");
      } else {
        setWallets(JSON.parse(wallets));
        setCurrentWallet(JSON.parse(wallets)[0]);
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
    <View
      style={{
        backgroundColor: white[800],
      }}
    >
      <Image
        source={{
          uri: "https://assets-v2.lottiefiles.com/a/35dde376-1178-11ee-9ed9-5fa2debad506/pEm0ztvcpk.gif",
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        contentFit="contain"
      />
    </View>
  );
}
