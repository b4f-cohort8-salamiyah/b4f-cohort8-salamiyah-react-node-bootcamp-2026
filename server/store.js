import { initialOpportunities, initialPosts } from "./data.js";

export let opportunities = initialOpportunities;
export let posts = [...initialPosts];
export const ALLOWED_TYPES = ["job", "internship", "scholarship", "volunteer"];
export const ALLOWED_CATEGORIES = [
  "announcement",
  "event",
  "community",
  "resource",
];

export const MIN_CONTENT_LENGTH = 3;
export const MAX_CONTENT_LENGTH = 2000;

let nextPostId = Math.max(...posts.map((post) => post.id)) + 1;

export function claimNextPostId() {
  const id = nextPostId;
  nextPostId += 1;
  return id;
}
