import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// New as of React v18.x
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);