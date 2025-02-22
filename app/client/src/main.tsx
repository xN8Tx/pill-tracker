import { registerSW } from "virtual:pwa-register";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { App } from "./app";

import "./index.css";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
