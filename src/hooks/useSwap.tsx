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

  const {
    inAmount,
    sellToken,
    buyToken,
    setTxHash,
    setError,
    setOutAmount,
    setGasFees,
  } = useSwapStore();

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

      const { swapTransaction } = await getSwapTransaction({
        quoteResponse: quoteResponse,
        publicKey: currentWallet?.publicKey as string,
      });

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      const message = transaction.message;

      const estimatedFee = await connection.getFeeForMessage(message);

      if (estimatedFee?.value) {
        setGasFees(estimatedFee?.value / Math.pow(10, 9));
      }

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

      const { swapTransaction } = await getSwapTransaction({
        quoteResponse: quoteResponse,
        publicKey: currentWallet?.publicKey,
      });

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      transaction.sign([userPayer]);

      const rawTransaction = transaction.serialize();
      const latestBlockHash = await connection.getLatestBlockhash();

      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      });

      setTxHash(txid);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return { quote, executeSwap };
}
