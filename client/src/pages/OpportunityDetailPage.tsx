import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Opportunity } from "../types";
import { applyToOpportunity, fetchOpportunityById, reportOpportunity } from "../api";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useNotify } from "../context/NotificationContext";
import RecentlyViewedList from "../components/RecentlyViewedList";
import { recordView } from "../store/recentlyViewedSlice";
import { useAppDispatch } from "../store/hooks";

const TYPE_LABELS = {
  job: "Job",
  internship: "Internship",
  scholarship: "Scholarship",
  volunteer: "Volunteer",
};

const WORK_MODE_LABELS = {
  remote: "Remote",
  hybrid: "Hybrid",
  "on-site": "On-site",
};

function OpportunityDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useNotify();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [reportReason, setReportReason] = useState("");
const [isReporting, setIsReporting] = useState(false);

  async function load() {
    setIsLoading(true);
    setHasError(false);
    try {
      // const opportunities = await fetchOpportunities();
      // const match = opportunities.find((el) => String(el.id) === id) ?? null;

      const match = id ? await fetchOpportunityById(Number(id)) : null;

      if (match) {
        dispatch(recordView({ id: match.id, title: match.title }));
      }

      setOpportunity(match);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setHasError(true);
      setIsLoading(false);
    }
  }

  async function handleApply() {
    if (!opportunity) return;

    setIsApplying(true);

    try {
      const updated = await applyToOpportunity(opportunity.id);
      setOpportunity(updated);
      notify(`Applied to ${updated.title}.`, "success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not submit your application.";
      notify(message, "error");
    } finally {
      setIsApplying(false);
    }
  }
  async function handleReport() {
  if (!opportunity) return;

  setIsReporting(true);

  try {
    await reportOpportunity(opportunity.id, reportReason.trim());
    notify("Thanks — your report was sent.", "success");
    setReportReason("");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not submit your report.";
    notify(message, "error");
  } finally {
    setIsReporting(false);
  }
}

  function formatDeadline(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    load();
  }, [id]);

 
  return (
    
    <section className="panel opportunity-detail-page">
      
      <div className="panel-header">
        <RecentlyViewedList excludeId={Number(id)} />
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="panel-scroll">
        {!isLoading && hasError && (
          <ErrorMessage
            message="We could not load this opportunity."
            onRetry={load}
          />
        )}

        {isLoading && !hasError && (
          <LoadingMessage label="Loading opportunity..." />
        )}

        {!isLoading && !hasError && opportunity && (
          
          <div className="opportunity-detail-content">
            <div className="opportunity-card-header">
              <div className="company-logo">{opportunity.companyLogo}</div>
              <div className="opportunity-card-title-block">
                <h2 className="opportunity-title">{opportunity.title}</h2>
                <p className="opportunity-company">{opportunity.company}</p>
              </div>
            </div>
            <div className="opportunity-badges">
              <span className={`type-badge type-${opportunity.type}`}>
                {TYPE_LABELS[opportunity.type]}
              </span>
              <span className="work-mode-badge">
                {WORK_MODE_LABELS[opportunity.workMode]}
              </span>
              <span className="location-badge">{opportunity.location}</span>
            </div>

            <div className="skills-row">
              {opportunity.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="opportunity-details">
              <p className="opportunity-description">
                {opportunity.description}
              </p>
              <p className="opportunity-deadline">
                Apply by {formatDeadline(opportunity.deadline)}
              </p>
            </div>

            <button
              className={`apply-button ${opportunity.applied ? "applied" : ""}`}
              onClick={handleApply}
              disabled={opportunity.applied || isApplying}
            >
              {opportunity.applied
                ? "Applied"
                : isApplying
                  ? "Applying..."
                  : "Apply"}
            </button>
            <div className="report-section">
  <label htmlFor="report-reason" className="report-label">
    Report an issue
  </label>
  <input
    id="report-reason"
    type="text"
    className="report-input"
    placeholder="Describe the problem…"
    value={reportReason}
    onChange={(e) => setReportReason(e.target.value)}
    disabled={isReporting}
  />
  <button
    type="button"
    className="report-button"
    onClick={handleReport}
    disabled={!reportReason.trim() || isReporting}
  >
    {isReporting ? "Sending…" : "Report"}
  </button>
</div>
          </div>
        )}

        {!isLoading && !hasError && !opportunity && (
          <div className="opportunity-detail-not-found">
            <p>No opportunity found with id "{id}".</p>
            <Link to="/opportunities" className="view-details-button">
              Back to Opportunities
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default OpportunityDetailPage;
