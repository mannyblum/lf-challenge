import Results from ".";
import { render, screen } from "../../utils/test-utils";
import { describe, it, expect, type Mock } from "vitest";

import { useGetGenresQuery, useGetMoviesQuery } from "../../slices/moviesApi";

import { genres, movies } from "../../../test/server";

vi.mock("../../slices/moviesApi", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../slices/moviesApi")
  >();
  return {
    ...actual,
    useGetMoviesQuery: vi.fn(),
    useGetGenresQuery: vi.fn(),
  };
});

describe("Search Results", () => {
  it("renders the component", async () => {
    (useGetMoviesQuery as Mock).mockReturnValue({
      data: { results: movies },
      isSuccess: true,
    });
    (useGetGenresQuery as Mock).mockReturnValue({
      data: genres,
    });
    render(<Results />);

    expect(screen.getByText(/Search Results for/i)).toBeDefined();
  });
});
