export default async function getTokens() {
    const response = await fetch("https://token.jup.ag/strict");
    const data = await response.json();
    return data;
}