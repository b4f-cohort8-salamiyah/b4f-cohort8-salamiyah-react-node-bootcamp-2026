import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { SavedOpportunitiesProvider } from "./context/SavedOpportunitiesContext";
import { RecentViewedProvider } from "./context/RecentViewedContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <NotificationProvider>
          <SavedOpportunitiesProvider>
            <RecentViewedProvider>
              <App />
            </RecentViewedProvider>
          </SavedOpportunitiesProvider>
        </NotificationProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
