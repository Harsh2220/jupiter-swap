import { PortfolioResponse } from "@/src/types/shyft"
import getEnv from "@/src/utils/getEnv"

const { SHYFT_API } = getEnv()

export default async function getPortfolio(address: String): Promise<PortfolioResponse> {
    const res = await fetch(`https://api.shyft.to/sol/v1/wallet/get_portfolio?network=mainnet-beta&wallet=${address}`,
        {
            method: "GET",
            headers: {
                "x-api-key": SHYFT_API
            }
        }
    )
    const data = await res.json()
    return data
}
