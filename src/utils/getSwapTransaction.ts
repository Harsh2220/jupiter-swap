type SwapTransactionParams = {
    quoteResponse: any,
    publicKey: string,
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
        })
    })
    const data = await res.json();
    return data
}
