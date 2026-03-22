import User from "../models/User.js";

export const getWatchlist = async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user.watchlist);
};

export const addToWatchlist = async (req, res) => {
    const { coinId } = req.body;

    const user = await User.findById(req.userId);

    if (!user.watchlist.includes(coinId)) {
        user.watchlist.push(coinId);
        await user.save();
    }

    res.json(user.watchlist);
};

export const removeFromWatchlist = async (req, res) => {
    const user = await User.findById(req.userId);

    user.watchlist = user.watchlist.filter(
        (c) => c !== req.params.coinId
    );

    await user.save();

    res.json(user.watchlist);
};