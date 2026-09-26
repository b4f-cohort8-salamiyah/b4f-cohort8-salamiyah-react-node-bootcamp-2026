import OpportunitiesSection from "../components/OpportunitiesSection";

// Thin page wrapper, same idea as CommunityPage: OpportunitiesSection keeps
// doing the real work, this file just gives <Route> something to render at
// /opportunities.
function OpportunitiesPage() {
  return <OpportunitiesSection />;
}

export default OpportunitiesPage;
