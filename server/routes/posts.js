import express from "express";
import { creatPost, getAllPosts, getPostsById } from "../controllers/posts.js";
import { likePost } from "../controllers/opportunities.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostsById);
router.post("/", creatPost);
router.patch("/:id", likePost);

export default router;
