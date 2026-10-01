import { initialOpportunities,initialPosts } from "./data.js";

export const opportunities = initialOpportunities;
export let posts = initialPosts;

export let nextPostId = Math.max(...posts.map((post) => post.id)) + 1;
export const ALLOWED_CATEGORIES = ["announcement", "event", "community", "resource"];
export const ALLOWED_TYPES = ["job", "internship", "scholarship", "volunteer"];
