import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
// React modules

import App from "@renderer/main/App";
// components

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
