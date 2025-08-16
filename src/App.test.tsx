import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import ProviderWrapper from "./context/ProviderWrapper";

describe("App", () => {
  it("should render the App", () => {
    render(<App />, { wrapper: ProviderWrapper });
    expect(screen.getByRole("main")).toBeDefined();
  });
});
