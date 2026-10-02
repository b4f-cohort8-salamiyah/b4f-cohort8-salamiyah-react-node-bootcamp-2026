import express from "express";
import {
  getAllPosts,
  getPostById,
  updatePostLike,
  composePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", composePost);
router.patch("/:id", updatePostLike);

export default router;
