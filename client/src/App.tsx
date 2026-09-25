import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastQueue from "./components/ToastQueue";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";
<<<<<<< HEAD
import NotFound from "./pages/NotFound";

let nextNotificationId = 1;
=======
import NotFoundPage from "./pages/NotFoundPage";
>>>>>>> 1213966ef8053e9eaa29ca9152f7658fe651e282

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
<<<<<<< HEAD
          <Route path="*" element={<NotFound />} />
=======

          <Route path="*" element={<NotFoundPage />} />
>>>>>>> 1213966ef8053e9eaa29ca9152f7658fe651e282
        </Routes>
      </main>

      <Footer />

      <ToastQueue />
    </div>
  );
}

export default App;
