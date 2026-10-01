import express from "express";
import {
  getAllPosts,
  getPostById,
  toggleLikePost,
  createPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", toggleLikePost);
export default router;
