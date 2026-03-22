import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.get("/", auth, getWatchlist);
router.post("/", auth, addToWatchlist);
router.delete("/:coinId", auth, removeFromWatchlist);

export default router;