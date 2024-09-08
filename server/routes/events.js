import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  unattendEvent,
  getUserEvents,
  getAllEvents,
} from "../controllers/events.js";

const router = express.Router();

router.post("/", verifyToken, createEvent);
router.get("/:id", verifyToken, getEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);
router.post("/:id/attend", verifyToken, attendEvent);
router.post("/:id/unattend", verifyToken, unattendEvent);
router.get("/user/:userId", verifyToken, getUserEvents);
router.get("/", verifyToken, getAllEvents);

export default router;