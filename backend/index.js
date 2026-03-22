import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://crypto-dashboard-one-dusky.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", cryptoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Health
app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});