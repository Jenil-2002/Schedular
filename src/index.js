import React from "react";
import ReactDOM from "react-dom/client"; // Update import path
import App from "./App";
import "./styles/styles.css";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JS (with Popper.js bundled)
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom";
import { SnackbarState } from "./context/SnackbarContext";
import "react-toastify/dist/ReactToastify.css";
import { BaseFilesState } from "./context/BaseFiles";

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Initial render
root.render(
  <BrowserRouter>
    <SnackbarState>
      <BaseFilesState>
          <App />
      </BaseFilesState>
    </SnackbarState>
  </BrowserRouter>
);
