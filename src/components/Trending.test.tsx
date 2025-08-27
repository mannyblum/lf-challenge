import { fireEvent, render, screen, waitFor } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";

import Trending from "./Trending";

const mockSetLocation = vi.fn();
vi.mock("wouter", async (importOriginal) => {
  const actual = await importOriginal<typeof import("wouter")>();
  return {
    ...actual,
    useLocation: () => ["/", mockSetLocation] as const,
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
    const mockLocation = "/details/2";

    render(<Trending />);

    await waitFor(() => {
      const movieItem = screen.getByText("Spaceballs");
      expect(movieItem).toBeDefined();

      fireEvent.click(movieItem);
      expect(mockSetLocation).toHaveBeenCalledWith(mockLocation);
    });
  });

  it("should use title if original_title doesn't exist", async () => {
    render(<Trending />);

    await waitFor(() => {
      const movieItem = screen.getByText("Life of Brian");

      expect(movieItem).toBeDefined();
    });
  });
});
