import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  toggleLikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", toggleLikePost);
export default router;
