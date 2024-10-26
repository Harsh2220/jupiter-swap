import useSwapStore from "@/src/store/swap";
import useWalletStore from "@/src/store/wallet";
import getSwapQuote from "@/src/utils/getSwapQuote";
import getSwapTransaction from "@/src/utils/getSwapTransaction";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import { Buffer } from "buffer";
import "react-native-get-random-values";

export default function useSwap() {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const { currentWallet } = useWalletStore();

  const { inAmount, sellToken, buyToken, setTxHash, setError, setOutAmount } =
    useSwapStore();

  async function quote() {
    try {
      if (!sellToken || !buyToken || !inAmount) return;
      if (Number(inAmount) === 0) {
        setOutAmount("");
        return 0;
      }
      const quoteResponse = await getSwapQuote({
        inputMint: sellToken?.address,
        outputMint: buyToken?.address,
        amount: Number(Number(inAmount) * 10 ** sellToken?.decimals!),
      });
      const amount = Number(
        (quoteResponse.outAmount / 10 ** buyToken?.decimals!).toFixed(2)
      );
      setOutAmount(amount.toString());
      return quoteResponse;
    } catch (error) {
      console.error(error);
    }
  }

  async function executeSwap() {
    try {
      if (!currentWallet || !sellToken || !buyToken || !inAmount) return;
      const userPayer = Keypair.fromSecretKey(
        base58.decode(currentWallet?.secretKey)
      );

      const quoteResponse = await getSwapQuote({
        inputMint: sellToken?.address,
        outputMint: buyToken?.address,
        amount: Number(Number(inAmount) * 10 ** sellToken?.decimals!),
      });

      const swapTransaction = await getSwapTransaction({
        quoteResponse: quoteResponse,
        publicKey: currentWallet?.publicKey,
      });

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.message.recentBlockhash = latestBlockhash.blockhash;

      transaction.sign([userPayer]);

      const { value: simulatedTransactionResponse } =
        await connection.simulateTransaction(transaction, {
          replaceRecentBlockhash: true,
          commitment: "processed",
        });
      const { err, logs } = simulatedTransactionResponse;

      if (err) {
        // Simulation error, we can check the logs for more details
        // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
        console.error("Simulation Error:");
        console.error({ err, logs });
        return;
      }

      const serializedTransaction = Buffer.from(transaction.serialize());
      const blockhash = transaction.message.recentBlockhash;

      const signature = await connection.sendRawTransaction(
        serializedTransaction,
        {
          skipPreflight: true,
        }
      );

      setTxHash(signature);
    } catch (error) {
      setError(true);
    }
  }

  return { quote, executeSwap };
}
