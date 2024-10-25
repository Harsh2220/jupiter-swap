import { LAMPORTS_PER_SOL } from '@solana/web3.js';

type SwapTransactionParams = {
    quoteResponse: any,
    publicKey: string,
    // priorityFees: string
}

export default async function getSwapTransaction(params: SwapTransactionParams) {
    const res = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteResponse: params.quoteResponse,
            userPublicKey: params.publicKey,
            wrapAndUnwrapSol: true,
            // prioritizationFeeLamports: Number(params.priorityFees) * LAMPORTS_PER_SOL,
        })
    })
    const data = await res.json();
    return data
}
