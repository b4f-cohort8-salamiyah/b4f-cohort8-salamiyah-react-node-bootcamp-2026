import { delay } from "../utils.js";
import {
  posts,
  ALLOWED_CATEGORIES,
  MAX_CONTENT_LENGTH,
  MIN_CONTENT_LENGTH,
  nextPostId,
  claimNextPostId,
} from "../store.js";

export async function getAllPosts(req, res) {
  await delay(350);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  res.json(sorted);
}

export function getPostById(req, res) {
  const id = Number(req.params.id);
  const post = posts.find((candidate) => candidate.id === id);

  if (!post) {
    return res.status(404).json({ error: `No post found with id ${id}.` });
  }

  res.status(200).json(post);
}

export function composePost(req, res) {
  const { content, category } = req.body ?? {};

  if (typeof content !== "string") {
    return res
      .status(400)
      .json({ error: "content is required and must be a string." });
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length < MIN_CONTENT_LENGTH) {
    return res.status(400).json({
      error: `content must be at least ${MIN_CONTENT_LENGTH} characters.`,
    });
  }

  if (trimmedContent.length > MAX_CONTENT_LENGTH) {
    return res.status(400).json({
      error: `content must be ${MAX_CONTENT_LENGTH} characters or fewer.`,
    });
  }

  if (typeof category !== "string" || !ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: `category is required and must be one of: ${ALLOWED_CATEGORIES.join(", ")}.`,
    });
  }

  const newPost = {
    id: claimNextPostId(),
    author: "You",
    avatar: "YOU",
    category: category,
    content: trimmedContent,
    createdAt: new Date().toISOString(),
    likes: 0,
    liked: false,
  };

  nextPostId += 1;
  posts = [newPost, ...posts];

  res.status(201).json(newPost);
}

export async function updatePostLike(req, res) {
  const id = Number(req.params.id);
  const { liked } = req.body ?? {};

  if (typeof liked !== "boolean") {
    return res
      .status(400)
      .json({ error: "liked is required and must be a boolean." });
  }

  const post = posts.find((candidate) => candidate.id === id);

  if (!post) {
    return res.status(404).json({ error: `No post found with id ${id}.` });
  }

  if (liked && !post.liked) {
    post.liked = true;
    post.likes += 1;
  } else if (!liked && post.liked) {
    post.liked = false;
    post.likes -= 1;
  }

  res.json(post);
}
