import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 FIX HERE
        req.userId = decoded.id || decoded.userId;

        // DEBUG (temporary)
        console.log("DECODED:", decoded);
        console.log("USER ID:", req.userId);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

export default auth;