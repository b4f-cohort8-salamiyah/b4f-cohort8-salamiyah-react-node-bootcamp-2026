import { useEffect, useState } from "react";
import type { Opportunity, OpportunityType, WorkMode } from "../types";
import { applyToOpportunity, fetchOpportunities } from "../api";
import OpportunityFilters from "./OpportunityFilters";
import OpportunityList from "./OpportunityList";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import RecentlyViewedList from "./RecentlyViewedList";
import { useNotify } from "../context/NotificationContext";
import { useSavedOpportunities } from "../context/SavedOpportunitiesContext";

function OpportunitiesSection() {
  const { notify } = useNotify();
  const { savedIds } = useSavedOpportunities();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");
  const [workModeFilter, setWorkModeFilter] = useState<WorkMode | "all">("all");
  const [savedOnly, setSavedOnly] = useState(false);

  const [applyingId, setApplyingId] = useState<number | null>(null);

  async function loadOpportunities() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  async function handleApply(id: number) {
    setApplyingId(id);

    try {
      const updated = await applyToOpportunity(id);

      const updatedOpportunities = opportunities.map((existing) => {
        if (existing.id === updated.id) {
          return updated;
        }

        return existing;
      });

      setOpportunities(updatedOpportunities);
      notify(`Applied to ${updated.title}.`, "success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not submit your application.";
      notify(message, "error");
    } finally {
      setApplyingId(null);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opportunitiesById: any = {};

  for (const opportunity of opportunities) {
    opportunitiesById[opportunity.id] = opportunity;
  }

  const search = searchText.toLowerCase();

  const visibleOpportunities = opportunities.filter((opportunity) => {
    const matchesSkill =
      opportunity.skills.find((skill) =>
        skill.toLowerCase().includes(search),
      ) !== undefined;

    const matchesSearch =
      opportunity.title.toLowerCase().includes(search) ||
      opportunity.company.toLowerCase().includes(search) ||
      matchesSkill;

    let matchesType = false;

    if (typeFilter === "all") {
      matchesType = true;
    } else if (opportunity.type === typeFilter) {
      matchesType = true;
    }

    let matchesWorkMode = false;

    if (workModeFilter === "all") {
      matchesWorkMode = true;
    } else if (opportunity.workMode === workModeFilter) {
      matchesWorkMode = true;
    }

    let matchesSaved = true;

    if (savedOnly && !savedIds.has(opportunity.id)) {
      matchesSaved = false;
    }

    return matchesSearch && matchesType && matchesWorkMode && matchesSaved;
  });

  return (
    <section className="panel opportunities-panel">
      <div className="panel-header">
        <h2 className="panel-title">Opportunities</h2>

        {!isLoading && !hasError && (
          <>
            <OpportunityFilters
              searchText={searchText}
              onSearchChange={setSearchText}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
              workModeFilter={workModeFilter}
              onWorkModeChange={setWorkModeFilter}
              savedOnly={savedOnly}
              onSavedOnlyChange={setSavedOnly}
              visibleCount={visibleOpportunities.length}
              totalCount={opportunities.length}
            />
          </>
        )}
      </div>

      <div className="panel-scroll">
        {/* CORE: Recently Viewed Strip rendered inside panel scroll */}
        <RecentlyViewedList />

        {isLoading && <LoadingMessage label="Loading opportunities..." />}

        {!isLoading && hasError && (
          <ErrorMessage
            message="We could not load opportunities. Please check your connection and try again."
            onRetry={loadOpportunities}
          />
        )}

        {!isLoading &&
          !hasError &&
          (visibleOpportunities.length === 0 ? (
            <EmptyState message="No opportunities match your filters right now." />
          ) : (
            <OpportunityList
              opportunities={visibleOpportunities}
              onApply={handleApply}
              applyingId={applyingId}
            />
          ))}
      </div>
    </section>
  );
}

export default OpportunitiesSection;