import express from "express";
import {
  applyToOpportunity,
  getAllOpportunities,
  getOpportunitiesById,
  getOpportunitiesByType,
} from "../controllers/opportunities.js";

const router = express.Router();

router.get("/", getAllOpportunities);
router.get("/:id", getOpportunitiesById);
router.get("/type/:type", getOpportunitiesByType);
router.patch("/:id", applyToOpportunity);

export default router;
