import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MoviesApp from "./MoviesApp.tsx";
import { MemoryRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/"]}>
      <MoviesApp />
    </MemoryRouter>
  </StrictMode>
);
