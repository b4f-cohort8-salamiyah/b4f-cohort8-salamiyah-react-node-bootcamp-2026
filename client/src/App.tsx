import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastQueue from "./components/ToastQueue";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotFound from "./pages/NotFound";

let nextNotificationId = 1;

function App() {
  return (
    <div className="page">
      <Navbar />

      <main className="main-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route
            path="/opportunities/:id"
            element={<OpportunityDetailPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <ToastQueue />
    </div>
  );
}

export default App;
