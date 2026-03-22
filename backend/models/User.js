import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    watchlist: [String], // coin IDs
});

export default mongoose.model("User", userSchema);