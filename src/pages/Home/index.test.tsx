import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from ".";

describe("Home", () => {
  test("should render", () => {
    render(<Home />);
    expect(screen.getByText("CineHavok")).toBeDefined();
  });
});
