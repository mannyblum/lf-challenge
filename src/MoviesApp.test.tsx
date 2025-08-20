import { render, screen } from "./utils/test-utils";
import MoviesApp from "./MoviesApp";
import { describe, it, expect } from "vitest";

describe("MoviesApp", () => {
  it("renders the App within Providers without crashing", () => {
    render(<MoviesApp />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
