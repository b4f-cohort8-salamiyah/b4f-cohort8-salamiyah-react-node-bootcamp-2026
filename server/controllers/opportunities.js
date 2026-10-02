import { delay } from "../utils.js";
import { opportunities, ALLOWED_TYPES, MIN_REASON_LENGTH } from "../store.js";

let reports = [
  { id: 0, opportunityid: 100, reason: "initial report", createAt: "now" },
];
let nextReportId = Math.max(...reports.map((report) => report.id)) + 1;
function claimNextReportId() {
  const id = Math.max(...reports.map((report) => report.id)) + 1;
  nextReportId += 1;
  return id;
}

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

export function reportOpportunity(req, res) {
  const { reason } = req.body ?? {};
  const id = Number(req.params.id);

  const opportunity = opportunities.find((candidate) => candidate.id === id);

  if (!opportunity) {
    return res
      .status(404)
      .json({ error: `No opportunity found with id ${id}.` });
  }

  if (typeof reason !== "string") {
    return res
      .status(400)
      .json({ error: "reason is required and must be a string." });
  }

  const trimmedReason = reason.trim();

  if (trimmedReason.length < MIN_REASON_LENGTH) {
    return res.status(400).json({
      error: `reason must be at least ${MIN_REASON_LENGTH} characters.`,
    });
  }

  const newReport = {
    id: claimNextReportId(),
    opportunityid: id,
    reason: trimmedReason,
    createAt: new Date().toISOString(),
  };

  nextReportId += 1;

  reports = [newReport, ...reports];

  res.status(201).json(newReport);
}
