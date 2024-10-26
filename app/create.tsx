import Button from "@/src/components/UI/Button";
import Container from "@/src/components/UI/Container";
import { Heading } from "@/src/components/UI/Heading";
import { black, white } from "@/src/constants/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, useWindowDimensions } from "react-native";
import * as Bip39 from "bip39";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { useRouter } from "expo-router";
import { storage } from "@/src/lib/storage";
import { STORAGE_KEYS } from "@/src/types/storage";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  async function generateWallet() {
    try {
      setIsLoading(true);
      const mnemonic = Bip39.generateMnemonic();
      const seed = Bip39.mnemonicToSeedSync(mnemonic, "").slice(0, 32);
      const keypair = Keypair.fromSeed(seed);

      const wallet = {
        name: "wallet 1",
        publicKey: keypair.publicKey.toBase58(),
        secretKey: bs58.encode(keypair.secretKey),
        seed: mnemonic,
      };

      storage.set(STORAGE_KEYS.WALLETS, JSON.stringify([wallet]));

      router.replace("/swap");
    } catch (error) {
      console.log("failed to get wallet", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Image
        source={require("../src/assets/images/login.png")}
        style={{
          height: height / 2,
          width: width,
        }}
        contentFit="cover"
      />
      <View
        style={{
          flex: 1,
          padding: 16,
          zIndex: 2,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 48,
          }}
        >
          <Heading
            style={{
              fontSize: width / 11,
              fontWeight: "600",
              color: black[700],
            }}
          >
            Trade your favourite
          </Heading>
          <Heading
            style={{
              fontSize: width / 11,
              fontWeight: "600",
              color: black[700],
            }}
          >
            creator token
          </Heading>
        </View>
        <Button
          onPress={generateWallet}
          style={{
            width: "100%",
            marginVertical: 8,
          }}
          isLoading={isLoading}
        >
          Create wallet
        </Button>
      </View>
    </Container>
  );
}
