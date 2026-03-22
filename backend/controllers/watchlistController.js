export const getWatchlist = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.watchlist || []);
    } catch (err) {
        console.error("WATCHLIST ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

export const addToWatchlist = async (req, res) => {
    try {
        const { coinId } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.watchlist.includes(coinId)) {
            user.watchlist.push(coinId);
            await user.save();
        }

        res.json(user.watchlist);
    } catch (err) {
        console.error("ADD WATCHLIST ERROR:", err);
        res.status(500).json({ error: "Failed to add" });
    }
};

export const removeFromWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.watchlist = user.watchlist.filter(
            (c) => c !== req.params.coinId
        );

        await user.save();

        res.json(user.watchlist);
    } catch (err) {
        console.error("REMOVE WATCHLIST ERROR:", err);
        res.status(500).json({ error: "Failed to remove" });
    }
};