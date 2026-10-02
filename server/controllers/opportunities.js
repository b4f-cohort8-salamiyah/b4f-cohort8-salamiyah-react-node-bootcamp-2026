import { delay } from "../utils.js";
import { opportunities, ALLOWED_TYPES } from "../store.js";

export async function getAllOpportunities(req, res) {
  await delay(350);
  res.json(opportunities);
}

export function getOpportunitiesById(req, res) {
  const id = Number(req.params.id);
  const opportunity = opportunities.find((candidate) => candidate.id === id);

  if (!opportunity) {
    return res
      .status(404)
      .json({ error: `No opportunity found with id ${id}.` });
  }

  res.json(opportunity);
}

export function getOpportunitiesByType(req, res) {
  const { type } = req.params;

  if (!ALLOWED_TYPES.includes(type)) {
    return res
      .status(400)
      .json({ error: `type must be one of: ${ALLOWED_TYPES.join(", ")}.` });
  }

  const matches = opportunities.filter(
    (opportunity) => opportunity.type === type,
  );

  res.json(matches);
}

export function applyToOpportunity(req, res) {
  const id = Number(req.params.id);
  const { applied } = req.body ?? {};

  if (applied !== true) {
    return res
      .status(400)
      .json({ error: "applied is required and must be true." });
  }

  const opportunity = opportunities.find((candidate) => candidate.id === id);

  if (!opportunity) {
    return res
      .status(404)
      .json({ error: `No opportunity found with id ${id}.` });
  }

  if (opportunity.applied) {
    return res
      .status(409)
      .json({ error: "You have already applied to this opportunity." });
  }

  opportunity.applied = true;

  res.json(opportunity);
}

const reports = [];
let nextReportId = 1;

export const reportOpportunity = (req, res) => {
  const opportunityId = Number(req.params.id);
  const { reason } = req.body ?? {};
  const opportunityExist = opportunities.some(
    (opp) => opp.id === opportunityId,
  );
  if (!opportunityExist) {
    return res.status(404).json({ error: "Opportunity not found" });
  }
  if (typeof reason !== "string" || reason.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Reason must be a string of at least 3 characters" });
  }
  const newReport = {
    id: nextReportId++,
    opportunityId: opportunityId,
    reason: reason.trim(),
    createdAt: new Date().toISOString(),
  };
  reports.push(newReport);
  res.status(201).json(newReport);
};
