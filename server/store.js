import { initialOpportunities, initialPosts } from "./data.js";

export const opportunities = initialOpportunities;
export const posts = initialPosts;
export const ALLOWED_TYPES = ["job", "internship", "scholarship", "volunteer"];

export const MIN_REASON_LENGTH = 3;

export const ALLOWED_CATEGORIES = [
  "announcement",
  "event",
  "community",
  "resource",
];

export const MIN_CONTENT_LENGTH = 3;
export const MAX_CONTENT_LENGTH = 2000;

export let nextPostId = Math.max(...posts.map((post) => post.id)) + 1;

export function claimNextPostId() {
  const id = nextPostId;
  nextPostId += 1;
  return id;
}
