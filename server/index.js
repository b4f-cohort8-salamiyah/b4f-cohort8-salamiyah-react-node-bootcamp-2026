// B4F Hub — local API.
//
// A small standalone Express server. It loads deterministic seed data on startup;
// all changes (new posts, likes, applications) live only in memory and are reset
// the next time this server restarts.
//
// Run with: npm start  (from inside the server/ folder — the client/ folder is a
// separate project and is started in its own terminal).

import express from "express";
import dotenv from "dotenv";
import opportunitiesRouter from "./routes/opportunities.js";
import postsRouter from "./routes/posts.js";
import healthRouter from "./routes/health.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// ---------- Health ----------

app.use("/api/health", healthRouter);

// ---------- Community ----------

app.use("/api/posts", postsRouter);

// ---------- Opportunities ----------

app.use("/api/opportunities", opportunitiesRouter);

app.listen(PORT, () => {
  console.log(`B4F Hub local API running at http://localhost:${PORT}`);
});
