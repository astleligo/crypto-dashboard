import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;

// 🔥 Crypto API Route
app.get("/api/crypto", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "inr",
                    order: "market_cap_desc",
                    per_page: 100,
                    price_change_percentage: "1h,24h,7d",
                    sparkline: true,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch crypto data" });
    }
});

// 🔥 Global stats route (extra upgrade)
app.get("/api/global", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3"
        );

        res.json(response.data.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch global data" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});