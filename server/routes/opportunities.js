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
router.get("/:id", getOpportunitiesById);
router.get("/type/:type", getOpportunitiesByType);
router.post("/:id/report", reportOpportunity);
router.patch("/:id", applyToOpportunity);

export default router;
