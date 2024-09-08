import express from "express";
import { searchAll } from "../controllers/search.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, searchAll);

export default router;