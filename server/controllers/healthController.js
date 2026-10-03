import { posts, opportunities } from "../store.js";

export function getHealthStatues(req, res) {
  res.json({
    status: "ok",
    opportunities: opportunities.length,
    posts: posts.length,
  });
};
