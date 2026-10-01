import express from "express";
import {
  getAllPosts,
  getPostId,
  createPost,
  editPost,
} from "../controllers/posts";

const router = express.Router();
router.get("/", getAllPosts);
router.get("/:id", getPostId);
router.post("/", createPost);
router.patch("/:id", editPost);

export default router;
