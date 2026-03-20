import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCrypto = async () => {
    const res = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
            price_change_percentage: "1h,24h"
        }
    });
    return res.data;
};