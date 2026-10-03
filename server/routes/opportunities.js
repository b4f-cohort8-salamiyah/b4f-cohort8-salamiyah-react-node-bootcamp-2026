import express from "express";
import {
  applyToOpportunity,
  getAllOpportunities,
  getOpportunitiesById,
  getOpportunitiesByType,
  reportOpportunity,
} from "../controllers/opportunities.js";

const router = express.Router();

router.get("/", getAllOpportunities);
router.get("/type/:type", getOpportunitiesByType);
router.get("/:id", getOpportunitiesById);
router.patch("/:id", applyToOpportunity);
router.post("/:id/report", reportOpportunity);

export default router;
