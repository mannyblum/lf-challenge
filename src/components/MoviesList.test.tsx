import { fireEvent, render, screen, waitFor } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";
import MoviesList from "./MoviesList";
import type { Movie } from "../types/movies";

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

const movies: Movie[] = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    title: "Robin Hood",
    budget: 1000000,
    runtime: 90,
    genre_ids: [1, 2, 3],
  },
  {
    id: 2,
    original_title: "Spaceballs",
    title: "Spaceballs",
    budget: 2000000,
    runtime: 90,
    genre_ids: [1, 4, 3],
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    title: "Blazing Saddles",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1, 5, 4],
  },
  {
    id: 4,
    title: "Life of Brian",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1],
  },
] as Movie[];

describe("MoviesList component", () => {
  it("renders the component", async () => {
    render(<MoviesList movies={movies} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Robin Hood: Men in Tights/i)
      ).toBeInTheDocument();
    });
  });

  it("should render pills with genre names", async () => {
    render(<MoviesList movies={movies} />);

    await waitFor(() => {
      const allElements = screen.getAllByText("Action");

      expect(allElements[1]).toBeInTheDocument();
    });
  });

  it("should navigate to /details/ with movieId and dispatch the selected movie", async () => {
    render(<MoviesList movies={movies} />);

    // find movie in list
    await waitFor(() => {
      const movieItem = screen.getByText("Spaceballs");

      expect(movieItem).toBeDefined();
      fireEvent.click(movieItem);
      expect(mockedUseNavigate).toHaveBeenCalledWith("/details/2");
    });
  });

  it("should used a different min-h if related prop is passed", async () => {
    render(<MoviesList movies={movies} related />);

    const testId = screen.getByTestId("movie-list");

    await waitFor(() => {
      expect(testId).toHaveClass("lg:grid-cols-4");
    });
  });
});
