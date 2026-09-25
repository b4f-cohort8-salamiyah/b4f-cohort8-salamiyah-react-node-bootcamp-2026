import type { Opportunity } from "../types";
import OpportunityCard from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];

  onApply: (id: number) => void;
  applyingId: number | null;
}

function OpportunityList({
  opportunities,
  onApply,
  applyingId,
}: OpportunityListProps) {
  return (
    <ul className="opportunity-list">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onApply={onApply}
          isApplying={applyingId === opportunity.id}
        />
      ))}
    </ul>
  );
}

export default OpportunityList;
