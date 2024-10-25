import useSwapStore from "@/src/store/swap";
import SwapSuccess from "@/src/components/swap/SwapSuccess";
import SwapError from "@/src/components/swap/SwapError";
import SwapConfirm from "@/src/components/swap/SwapConfirm";

export default function SwapConfirmSheet() {
  const { txHash, error } = useSwapStore();

  if (txHash) return <SwapSuccess />;

  if (error) return <SwapError />;

  return <SwapConfirm />;
}
