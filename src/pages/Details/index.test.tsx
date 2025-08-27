import { describe, expect, it, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "../../utils/test-utils";
import Details from ".";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetRelatedMoviesQuery,
} from "../../slices/moviesApi";
import { useAppSelector } from "../../hooks/rtk";
import { useRoute } from "wouter";

vi.mock("../../slices/moviesApi", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../slices/moviesApi")
  >();
  return {
    ...actual,
    useGetMovieDetailsQuery: vi.fn(),
    useGetMovieCreditsQuery: vi.fn(),
    useGetRelatedMoviesQuery: vi.fn(),
  };
});

vi.mock("../../hooks/rtk", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../hooks/rtk")>();
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
  };
});

// const mockSetLocation = vi.fn();
vi.mock("wouter", async (importOriginal) => {
  const actual = await importOriginal<typeof import("wouter")>();
  return {
    ...actual,
    useRoute: vi.fn(),
  };
});

const mockMovie = {
  id: 1,
  original_title: "Robin Hood: Men in Tights",
  backdrop_path: "/path/to/backdrop.jpg",
  title: "Robin Hood",
  budget: 1000000,
  revenue: 400000,
  runtime: 90,
  genre_ids: [1, 2, 3],
  genres: [
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Adventure",
    },
    {
      id: 3,
      name: "Comedy",
    },
  ],
  spoken_languages: [
    { iso_639_1: 123, name: "English", english_name: "English" },
    { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
  ],
  release_date: "2025-05-17",
};

const mockUseRoute = useRoute as Mock;

describe("Details", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should use selectedMovieId when is not -1", async () => {
    (useAppSelector as unknown as Mock).mockReturnValue(1);
    mockUseRoute.mockReturnValue([true, { movieId: "10" }]);

    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: mockMovie,
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    await waitFor(() => {
      expect(
        screen.getByText(/Robin Hood: Men in Tights/i)
      ).toBeInTheDocument();
    });
  });

  it("should use params.movieId when selectedMovie is -1", async () => {
    (useAppSelector as unknown as Mock).mockReturnValue(-1);
    mockUseRoute.mockReturnValue({ movieId: "1" });

    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: mockMovie,
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    await waitFor(() => {
      expect(
        screen.getByText(/Robin Hood: Men in Tights/i)
      ).toBeInTheDocument();
    });
  });

  it("should display loading state when missing data", async () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({ data: undefined });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({ data: undefined });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({ data: undefined });

    render(<Details />);

    await waitFor(() => {
      expect(
        screen.getByText(/Preparing your cinematic experience.../i)
      ).toBeInTheDocument();
    });
  });

  it("should render movie details once data is loaded", () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        original_title: "Robin Hood: Men in Tights",
        backdrop_path: "/path/to/backdrop.jpg",
        title: "Robin Hood",
        budget: 1000000,
        revenue: 400000,
        runtime: 90,
        genre_ids: [1, 2, 3],
        genres: [
          {
            id: 1,
            name: "Action",
          },
          {
            id: 2,
            name: "Adventure",
          },
          {
            id: 3,
            name: "Comedy",
          },
        ],
        spoken_languages: [
          { iso_639_1: 123, name: "English", english_name: "English" },
          { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
        ],
        release_date: "2025-05-17",
      },
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);
    expect(screen.getByText(/Robin Hood: Men in Tights/i)).toBeInTheDocument();
  });

  it("should render release year", () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: mockMovie,
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("should render 'Unknown' if no release year", () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        original_title: "Robin Hood: Men in Tights",
        backdrop_path: "/path/to/backdrop.jpg",
        title: "Robin Hood",
        budget: 1000000,
        runtime: 90,
        genre_ids: [1, 2, 3],
        genres: [
          {
            id: 1,
            name: "Action",
          },
          {
            id: 2,
            name: "Adventure",
          },
          {
            id: 3,
            name: "Comedy",
          },
        ],
        spoken_languages: [
          { iso_639_1: 123, name: "English", english_name: "English" },
          { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
        ],
        release_date: null,
      },
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    expect(screen.queryByText("Unknown")).toBeInTheDocument();
  });

  it("renders all tabs", async () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: mockMovie,
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    expect(screen.getByRole("tab", { name: /Cast and Crew/i }));
    expect(screen.getByRole("tab", { name: /Details/i }));
    expect(screen.getByRole("tab", { name: /Awards/i }));
    expect(screen.getByRole("tab", { name: /Related/i }));
  });

  it("should render runtime in mins", () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: mockMovie,
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    const icon = screen.getByTestId("FaRegClock");

    expect(icon).toBeVisible();
    expect(screen.getByText("90 min")).toBeInTheDocument();
  });

  it("should not render runtime if data is null", () => {
    (useGetMovieDetailsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        original_title: "Robin Hood: Men in Tights",
        backdrop_path: "/path/to/backdrop.jpg",
        title: "Robin Hood",
        budget: 1000000,
        runtime: null,
        genre_ids: [1, 2, 3],
        genres: [
          {
            id: 1,
            name: "Action",
          },
          {
            id: 2,
            name: "Adventure",
          },
          {
            id: 3,
            name: "Comedy",
          },
        ],
        spoken_languages: [
          { iso_639_1: 123, name: "English", english_name: "English" },
          { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
        ],
        release_date: null,
      },
    });
    (useGetMovieCreditsQuery as Mock).mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
    });
    (useGetRelatedMoviesQuery as Mock).mockReturnValue({
      data: [],
    });

    render(<Details />);

    const icon = screen.queryByTestId("FaRegClock");

    expect(icon).toBeNull();
    expect(screen.queryByText("90 min")).not.toBeInTheDocument();
  });
});
