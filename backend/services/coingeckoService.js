import axios from "axios";

export const fetchCrypto = async () => {
    return axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
            vs_currency: "inr",
            order: "market_cap_desc",
            per_page: 20,
            price_change_percentage: "1h,24h,7d",
            sparkline: true,
        },
    });
};

export const fetchGlobal = async () => {
    return axios.get("https://api.coingecko.com/api/v3/global");
};