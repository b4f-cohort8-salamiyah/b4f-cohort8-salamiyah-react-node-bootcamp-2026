import { initialOpportunities, initialPosts } from "./data.js";

export const opportunities = initialOpportunities;
export const ALLOWED_TYPES = ["job", "internship", "scholarship", "volunteer"];

export let posts = initialPosts;
let nextPostId = Math.max(...posts.map((post) => post.id)) + 1;

export function claimNextPostId() {
  return nextPostId++;
}

export const ALLOWED_CATEGORIES = [
  "announcement",
  "event",
  "community",
  "resource",
];
export const MIN_CONTENT_LENGTH = 3;
export const MAX_CONTENT_LENGTH = 2000;
