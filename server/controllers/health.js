import { opportunities, posts } from "../store.js";

export function getHealth(req, res) {
  res.json({
    status: "ok",
    opportunities: opportunities.length,
    posts: posts.length,
  });
}