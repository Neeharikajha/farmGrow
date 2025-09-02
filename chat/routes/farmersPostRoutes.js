import express from "express";
import { protect } from "../middleware/auth.js";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/farmersPost.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
