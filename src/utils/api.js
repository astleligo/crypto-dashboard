import axios from "axios";
import { Sparklines } from "react-sparklines";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCrypto = async () => {
    const res = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
            vs_currency: "inr",
            order: "market_cap_desc",
            per_page: 100,
            price_change_percentage: "1h,24h,7d",
            sparkline: true
        }
    });
    return res.data;
};