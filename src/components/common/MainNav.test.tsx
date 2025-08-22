import { render, screen } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";
import MainNav from "./MainNav";
import userEvent from "@testing-library/user-event";

const mockedUseNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate, // return a spy
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
    render(<MainNav />);

    const user = userEvent.setup();

    const homeButton = screen.getByRole("button", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    await user.click(homeButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("should navigate to '/browse' when Browse button is clicked", async () => {
    render(<MainNav />);

    const user = userEvent.setup();

    const browseButton = screen.getByRole("button", { name: /browse/i });
    expect(browseButton).toBeInTheDocument();
    await user.click(browseButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/browse", {
      replace: true,
    });
  });
});
