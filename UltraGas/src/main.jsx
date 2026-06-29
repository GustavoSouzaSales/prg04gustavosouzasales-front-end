import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="318466239227-f78juq2eeluq7foivm9eh4r7o8bkhg92.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);