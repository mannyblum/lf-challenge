import { describe, expect, it } from "vitest";
import { render, screen } from "../../utils/test-utils";
import Browse from ".";

describe("Browse", () => {
  it("should render the Browse page", () => {
    render(<Browse />);

    expect(screen.findByText(/Popular Movies/i)).toBeDefined();
  });

  it("should render movielist if popularMovie data is fetched successfully", async () => {
    render(<Browse />);

    expect(
      await screen.findByRole("heading", { name: /Popular Movies/i })
    ).toBeDefined();
    expect(await screen.findByText(/4 movies found/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spaceballs/i)).toBeInTheDocument();
  });
});
