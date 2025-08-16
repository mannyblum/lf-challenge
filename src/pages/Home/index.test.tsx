import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from ".";

describe("Home", () => {
  it("should render the Home page", () => {
    render(<Home />);
    expect(screen.getByText("MovieKaos")).toBeDefined();
  });
});
