export interface PortfolioResponse {
    success: boolean
    message: string
    result: Result
}

export interface Result {
    sol_balance: number
    num_tokens: number
    tokens: Token[]
    num_nfts: number
    nfts: Nft[]
}

export interface Token {
    address: string
    balance: number
}

export interface Nft {
    key: number
    updateAuthority: string
    mint: string
    data: Data
    primarySaleHappened: number
    isMutable: number
}

export interface Data {
    name: string
    symbol: string
    uri: string
    sellerFeeBasisPoints: number
    creators: Creator[]
}

export interface Creator {
    address: string
    verified: number
    share: number
}
