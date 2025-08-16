import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from ".";
import ProviderWrapper from "@/context/ProviderWrapper";

describe("Home", () => {
  it("should render the Home page", () => {
    render(<Home />, { wrapper: ProviderWrapper });
    expect(screen.getByText("MovieKaos")).toBeDefined();
  });
});
