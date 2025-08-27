import { render, screen } from "../../utils/test-utils";
import { describe, it, expect, vi } from "vitest";
import MainNav from "./MainNav";
import userEvent from "@testing-library/user-event";

const mockSetLocation = vi.fn();
vi.mock("wouter", async (importOriginal) => {
  const actual = await importOriginal<typeof import("wouter")>();
  return {
    ...actual,
    useLocation: () => ["/", mockSetLocation] as const,
  };
});

describe("MainNav", () => {
  it("renders the MainNav", async () => {
    render(<MainNav />);

    const icon = screen.getByTestId("FaFilm");
    const inputNode = screen.queryByLabelText("searchbar-label");
    const homeButton = screen.getByRole("button", { name: /home/i });
    const browseButton = screen.getByRole("button", { name: /browse/i });

    expect(icon).toBeVisible();
    expect(inputNode).toBeDefined();
    expect(homeButton).toBeInTheDocument();
    expect(browseButton).toBeInTheDocument();
  });

  it("should navigate to '/' when Home button is clicked", async () => {
    const mockLocation = "/";

    render(<MainNav />);

    const user = userEvent.setup();

    const homeButton = screen.getByRole("button", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    await user.click(homeButton);
    expect(mockSetLocation).toHaveBeenCalledWith(mockLocation);
  });

  it("should navigate to '/browse' when Browse button is clicked", async () => {
    const mockLocation = "/browse";
    render(<MainNav />);

    const user = userEvent.setup();

    const browseButton = screen.getByRole("button", { name: /browse/i });
    expect(browseButton).toBeInTheDocument();
    await user.click(browseButton);
    expect(mockSetLocation).toHaveBeenCalledWith(mockLocation);
  });
});
