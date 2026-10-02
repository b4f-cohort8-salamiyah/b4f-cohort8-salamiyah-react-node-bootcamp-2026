import { delay } from "../utils.js";
import { claimNextPostId, posts } from "../store.js";
import { ALLOWED_CATEGORIES } from "../store.js";
import { MAX_CONTENT_LENGTH, MIN_CONTENT_LENGTH } from "../store.js";

export async function getAllPosts(req, res) {
  await delay(350);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  res.json(sorted);
}

export function getPostsById(req, res) {
  const id = claimNextPostId();
  const post = posts.find((candidate) => candidate.id === id);
  if (!post) {
    return res.status(404).json({ error: `No post found with id ${id}.` });
  }
  res.json(post);
}

export function creatPost(req, res) {
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
    id: nextPostId,
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
