import { Connection } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", {
    commitment: "finalized",
});

export default connection