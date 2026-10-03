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
