import useSwapStore from "@/src/store/swap";
import useWalletStore from "@/src/store/wallet";
import getPortfolio from "@/src/utils/getPortfolio";
import getSwapQuote from "@/src/utils/getSwapQuote";
import getSwapTransaction from "@/src/utils/getSwapTransaction";
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import { Buffer } from "buffer";
import "react-native-get-random-values";
import connection from "../lib/connection";

export default function useSwap() {
  const currentWallet = useWalletStore((state) => state.currentWallet);
  const setTokens = useWalletStore((state) => state.setTokens);
  const setSolBalance = useWalletStore((state) => state.setSolBalance);
  const inAmount = useSwapStore((state) => state.inAmount);
  const sellToken = useSwapStore((state) => state.sellToken);
  const buyToken = useSwapStore((state) => state.buyToken);
  const setTxHash = useSwapStore((state) => state.setTxHash);
  const setError = useSwapStore((state) => state.setError);
  const setOutAmount = useSwapStore((state) => state.setOutAmount);
  const setGasFees = useSwapStore((state) => state.setGasFees);

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

      const { value: simulatedTransactionResponse } =
        await connection.simulateTransaction(transaction, {
          replaceRecentBlockhash: true,
          commitment: "processed",
        });
      const { err, logs } = simulatedTransactionResponse;

      if (err) {
        console.error("Simulation Error:");
        console.error({ err, logs });
        return;
      }

      const rawTransaction = Buffer.from(transaction.serialize());

      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const portfolio = await getPortfolio(currentWallet?.publicKey);

      if (portfolio?.result) {
        if (portfolio?.result?.sol_balance) {
          setSolBalance(portfolio?.result?.sol_balance);
        }
        setTokens(portfolio?.result?.tokens);
      }

      setTxHash(txid);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return { quote, executeSwap };
}
