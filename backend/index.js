import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
}));

const PORT = process.env.PORT || 5000;

// 🔥 CACHE
let cache = null;
let lastFetch = 0;

// 🔥 CRYPTO API
app.get("/api/crypto", async (req, res) => {
    const now = Date.now();

    if (cache && now - lastFetch < 60000) {
        return res.json(cache);
    }

    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "inr",
                    order: "market_cap_desc",
                    per_page: 50,
                    price_change_percentage: "1h,24h,7d",
                    sparkline: true,
                },
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
                timeout: 10000,
            }
        );

        cache = response.data;
        lastFetch = now;

        res.json(cache);
    } catch (error) {
        console.error(
            "CRYPTO ERROR:",
            error.response?.data || error.message
        );

        res.status(500).json({ error: "Failed to fetch crypto data" });
    }
});

// 🔥 GLOBAL API (FIXED)
app.get("/api/global", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/global",
            {
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
            }
        );

        res.json(response.data.data);
    } catch (error) {
        console.error(
            "GLOBAL ERROR:",
            error.response?.data || error.message
        );

        res.status(500).json({ error: "Failed to fetch global data" });
    }
});

// 🔥 HEALTH CHECK
app.get("/", (req, res) => {
    res.send("🚀 Backend running");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});