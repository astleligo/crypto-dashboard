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

// 🔥 RETRY FUNCTION
const fetchWithRetry = async (retries = 3) => {
    try {
        return await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "inr",
                    order: "market_cap_desc",
                    per_page: 20, // 🔥 IMPORTANT: reduce load
                    price_change_percentage: "1h,24h,7d",
                    sparkline: true,
                },
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
                timeout: 15000,
            }
        );
    } catch (err) {
        if (retries > 0) {
            console.log("Retrying API call...");
            await new Promise((r) => setTimeout(r, 1000));
            return fetchWithRetry(retries - 1);
        }
        throw err;
    }
};

// 🔥 CRYPTO API
app.get("/api/crypto", async (req, res) => {
    const now = Date.now();

    // ✅ 2 MIN CACHE
    if (cache && now - lastFetch < 120000) {
        return res.json(cache);
    }

    try {
        const response = await fetchWithRetry();

        cache = response.data;
        lastFetch = now;

        res.json(cache);
    } catch (error) {
        console.error(
            "CRYPTO ERROR:",
            error.response?.status,
            error.response?.data,
            error.message
        );

        // 🔥 FALLBACK (very important)
        if (cache) {
            return res.json(cache);
        }

        res.status(500).json({
            error: "Failed to fetch crypto data",
        });
    }
});

// 🔥 GLOBAL API
let globalCache = null;
let globalLastFetch = 0;

app.get("/api/global", async (req, res) => {
    const now = Date.now();

    // ✅ 5 min cache
    if (globalCache && now - globalLastFetch < 300000) {
        console.log("✅ GLOBAL CACHE HIT");
        return res.json(globalCache);
    }

    try {
        console.log("❌ FETCHING GLOBAL FROM COINGECKO");

        const response = await axios.get(
            "https://api.coingecko.com/api/v3/global"
        );

        globalCache = response.data.data;
        globalLastFetch = now;

        console.log(globalCache);


        return res.json(globalCache);
    } catch (error) {
        console.error("GLOBAL ERROR:", error.response?.status);

        // ✅ fallback if rate limited
        if (globalCache) {
            console.log("⚠️ USING OLD GLOBAL CACHE");
            return res.json(globalCache);
        }

        // ✅ fallback dummy (prevents crash)
        return res.json({
            total_market_cap: { usd: 0 },
            total_volume: { usd: 0 },
            market_cap_percentage: { btc: 0 },
        });
    }
});

// 🔥 HEALTH CHECK
app.get("/", (req, res) => {
    res.send("🚀 Crypto Dashboard Backend Running");
});

// 🔥 START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});