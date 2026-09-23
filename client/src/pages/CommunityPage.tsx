import CommunitySection from "../components/CommunitySection";

// Thin page wrapper: the real work still lives in CommunitySection, which
// hasn't changed at all. This file's only job is to be the thing a <Route>
// renders at /community.
function CommunityPage() {
  return <CommunitySection />;
}

export default CommunityPage;
