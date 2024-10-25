export interface IToken {
    price: string;
    name: string;
    image: string;
    symbol: string;
    balance: number;
    address: string;
    decimal: number;
}

export interface JupToken {
    address: string
    chainId: number
    decimals: number
    name: string
    symbol: string
    logoURI: string
    extensions: Extensions
    tags: string[],
}

export interface Extensions {
    coingeckoId: string
}

export type Wallet = {
    name: string;
    publicKey: string;
    hasSeed: boolean;
}

export interface Tag {
    value: string
    provider: string
}