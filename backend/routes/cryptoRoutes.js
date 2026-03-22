import express from "express";
import { getCrypto, getGlobal } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/crypto", getCrypto);
router.get("/global", getGlobal);

export default router;