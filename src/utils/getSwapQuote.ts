type getSwapQuoteParams = {
    inputMint: string,
    outputMint: string,
    amount: number
}

export default async function getSwapQuote(params: getSwapQuoteParams) {
    const res = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${params.inputMint}&outputMint=${params.outputMint}&amount=${params.amount}&slippageBps=50`
    )
    const data = await res.json();
    return data
}
