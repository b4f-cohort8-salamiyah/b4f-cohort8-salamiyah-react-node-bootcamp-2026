import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";

import { Provider } from "react-redux";
import store from "./store/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <NotificationProvider>
            
              <App />
            
          </NotificationProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
}
