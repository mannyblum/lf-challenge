import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "../utils/test-utils";
import { describe, it, expect } from "vitest";

import MovieDetailsExtra from "./MovieDetailsExtra";
import type { Credits, Movie } from "@/types/movies";

const movieDetails: Movie = {
  id: 2,
  original_title: "Spaceballs",
  spoken_languages: [
    { iso_639_1: 123, name: "English", english_name: "English" },
    { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
  ],
  revenue: 1000000,
  budget: 400000,
} as Movie;

const credits: Credits = {
  id: 1,
  cast: [
    {
      id: 1,
      name: "Rick Moranis",
      original_name: "Rick Moranis",
      profile_path: "urlToPhoto.jpg",
      character: "Lord Helmet",
    },
  ],
  crew: [
    {
      id: 1,
      name: "Ezra Swerdlow",
      job: "Producer",
    },
    {
      id: 2,
      name: "Thomas Meehan",
      job: "Screenplay",
    },
    {
      id: 3,
      name: "Ronny Graham",
      job: "Screenplay",
    },
    {
      id: 4,
      name: "Mel Brooks",
      job: "Director",
    },
  ],
};

const credits2: Credits = {
  id: 1,
  cast: [
    {
      id: 1,
      name: "Rick Moranis",
      original_name: "Rick Moranis",
      profile_path: "urlToPhoto.jpg",
      character: "Lord Helmet",
    },
  ],
  crew: [
    {
      id: 1,
      name: "Ezra Swerdlow",
      job: "Producer",
    },
    {
      id: 2,
      name: "Thomas Meehan",
      job: "Screenplay",
    },
    {
      id: 3,
      name: "Ronny Graham",
      job: "Screenplay",
    },
  ],
};

const relatedMovies: Movie[] = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    title: "Robin Hood",
    budget: 1000000,
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    title: "Blazing Saddles",
    budget: 11000000,
  },
  {
    id: 4,
    title: "Life of Brian",
    budget: 11000000,
  },
] as Movie[];

describe("MovieDetailsExtra Component", () => {
  it("renders the component", async () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Cast & Crew/i)).toBeDefined();
      expect(screen.getByText(/Details/i)).toBeDefined();
      expect(screen.getByText(/Awards/i)).toBeDefined();
      expect(screen.getByText(/Related/i)).toBeDefined();
    });
  });

  it("should set the first tab as active by default", async () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Cast & Crew")).toHaveAttribute(
        "data-state",
        "active"
      );
      expect(screen.getByText("Details")).toHaveAttribute(
        "data-state",
        "inactive"
      );
    });
  });

  it("should update active tab when another tab is clicked", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );
    const relatedMoviesBtn = screen.getByText(/Related/i);

    // click second tab
    fireEvent.click(relatedMoviesBtn);

    expect(relatedMoviesBtn).toHaveAttribute("data-state", "active");
    expect(screen.getByText(/Cast & Crew/i)).toHaveAttribute(
      "data-state",
      "inactive"
    );
  });

  it("should update active tab when Awards & Recognition is clicked", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );
    const awardsBtn = screen.getByText(/Awards/i);

    // click second tab
    fireEvent.click(awardsBtn);

    expect(awardsBtn).toHaveAttribute("data-state", "active");
    expect(screen.getByText(/Cast & Crew/i)).toHaveAttribute(
      "data-state",
      "inactive"
    );
  });

  it("should have a credits object to parse", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );
  });

  it("should extract and renders writers from credits", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );

    const detailsBtn = screen.getByText("Details");
    fireEvent.click(detailsBtn);

    expect(detailsBtn).toHaveAttribute("data-state", "active");

    expect(
      within(screen.getByTestId("writers")).getByText(/Thomas Meehan/i)
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("writers")).getByText(/Ronny Graham/i)
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("writers")).queryByText(/Ezra Swerdlow/i)
    ).not.toBeInTheDocument();
  });

  it("should update director, writers and languages when credits exist", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    );

    const detailsBtn = screen.getByText("Details");
    fireEvent.click(detailsBtn);

    expect(detailsBtn).toHaveAttribute("data-state", "active");

    expect(screen.getByText(/Mel Brooks/i)).toBeInTheDocument();
    expect(screen.getByText(/Thomas Meehan, Ronny Graham/)).toBeInTheDocument();
    expect(screen.getByText(/English, Spanish/)).toBeInTheDocument();
  });

  it("handles missing director in crew", () => {
    render(
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits2}
        relatedMovies={relatedMovies}
      />
    );

    const detailsBtn = screen.getByText("Details");
    fireEvent.click(detailsBtn);

    expect(detailsBtn).toHaveAttribute("data-state", "active");
    expect(
      within(screen.getByTestId("director")).queryByText(/Mel Brooks/i)
    ).not.toBeInTheDocument();

    expect(
      within(screen.getByTestId("writers")).getByText(/Thomas Meehan/i)
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("writers")).getByText(/Ronny Graham/i)
    ).toBeInTheDocument();
  });
});
