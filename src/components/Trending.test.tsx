import { fireEvent, render, screen, waitFor } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";

import Trending from "./Trending";

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

describe("Trending Component", () => {
  it("renders the component", async () => {
    render(<Trending />);

    await waitFor(() => {
      expect(screen.getByText(/Trending Now/i)).toBeDefined();
    });
  });

  it("should render some buttons with trending movie titles", async () => {
    render(<Trending />);

    await waitFor(() => {
      expect(screen.getByText(/Robin Hood: Men in Tights/i)).toBeDefined();
      expect(screen.getByText(/Spaceballs/i)).toBeDefined();
      expect(screen.getByText(/Blazing Saddles/i)).toBeDefined();
    });
  });

  it("should navigate to /details/ with movieId and dispatch the selected movie", async () => {
    render(<Trending />);

    // find movie in list
    await waitFor(() => {
      const movieItem = screen.getByText("Spaceballs");

      expect(movieItem).toBeDefined();
      fireEvent.click(movieItem);
      expect(mockedUseNavigate).toHaveBeenCalledWith("/details/2");
    });
  });

  it("should use title if original_title doesn't exist", async () => {
    render(<Trending />);

    // find movie in list
    await waitFor(() => {
      const movieItem = screen.getByText("Life of Brian");

      expect(movieItem).toBeDefined();
    });
  });
});
