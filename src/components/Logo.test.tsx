import { render, screen } from "../utils/test-utils";
import { describe, it, expect } from "vitest";
import Logo from "./Logo";

describe("MoviesApp", () => {
  it("renders the logo with default size", () => {
    render(<Logo />);

    const icon = screen.getByTestId("FaFilm");
    expect(icon).toBeVisible();
    expect(icon.parentElement).toHaveClass("p-3");
    expect(screen.getByRole("heading", { name: /MovieKaos/i })).toHaveClass(
      "text-2xl"
    );
  });

  it("renders the logo with small size", () => {
    render(<Logo size="small" />);

    const icon = screen.getByTestId("FaFilm");
    expect(icon).toBeVisible();
    expect(icon.parentElement).toHaveClass("p-2");
    expect(screen.getByRole("heading", { name: /MovieKaos/i })).toHaveClass(
      "text-lg"
    );
  });
});
