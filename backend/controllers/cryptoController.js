import { fetchCrypto, fetchGlobal } from "../services/coingeckoService.js";

let cryptoCache = null;
let cryptoTime = 0;

let globalCache = null;
let globalTime = 0;

export const getCrypto = async (req, res) => {
    const now = Date.now();

    if (cryptoCache && now - cryptoTime < 300000) {
        return res.json(cryptoCache);
    }

    try {
        const data = await fetchCrypto(); // ✅ NOT response.data

        cryptoCache = data;
        cryptoTime = now;

        res.json(cryptoCache);
    } catch (err) {
        console.error("Crypto error:", err.message);

        if (cryptoCache) return res.json(cryptoCache);

        res.status(500).json({ error: "Crypto fetch failed" });
    }
};

export const getGlobal = async (req, res) => {
    const now = Date.now();

    if (globalCache && now - globalTime < 300000) {
        return res.json(globalCache);
    }

    try {
        const response = await fetchGlobal();

        globalCache = response.data.data;
        globalTime = now;

        res.json(globalCache);
    } catch (err) {
        if (globalCache) return res.json(globalCache);
        res.json(null);
    }
};