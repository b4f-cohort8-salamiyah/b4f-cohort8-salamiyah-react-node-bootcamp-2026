import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { Provider } from "react-redux";
import store from "./store/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <NotificationProvider>
            {/* <SavedOpportunitiesProvider> */}
            <RecentlyViewedProvider>
              <App />
            </RecentlyViewedProvider>
            {/* </SavedOpportunitiesProvider> */}
          </NotificationProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
}
