import { PortfolioResponse } from "@/src/types/shyft"

export default async function getPortfolio(address: String): Promise<PortfolioResponse> {
    const res = await fetch(`https://api.shyft.to/sol/v1/wallet/get_portfolio?network=mainnet-beta&wallet=${address}`,
        {
            method: "GET",
            headers: {
                "x-api-key": `${process.env.EXPO_PUBLIC_SHYFT_API_KEY}`
            }
        }
    )
    const data = await res.json()
    return data
}
