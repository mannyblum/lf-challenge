import { describe, it, expect } from "vitest";
import reducer, {
  setSearchTerm,
  setSelectedMovieId,
} from "../slices/moviesSlice"; // adjust path

describe("movies slice", () => {
  const initialState = {
    searchTerm: "",
    selectedMovieId: -1,
  };

  it("should return the initial state when passed an empty action", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle setSearchTerm", () => {
    const action = setSearchTerm("batman");
    const result = reducer(initialState, action);

    expect(result.searchTerm).toBe("batman");
    expect(result.selectedMovieId).toBe(-1); // unchanged
  });

  it("should handle setSelectedMovieId", () => {
    const action = setSelectedMovieId(42);
    const result = reducer(initialState, action);

    expect(result.selectedMovieId).toBe(42);
    expect(result.searchTerm).toBe(""); // unchanged
  });

  it("setSearchTerm action creator should create the correct action", () => {
    const action = setSearchTerm("spiderman");
    expect(action).toEqual({
      type: "movies/setSearchTerm",
      payload: "spiderman",
    });
  });

  it("setSelectedMovieId action creator should create the correct action", () => {
    const action = setSelectedMovieId(100);
    expect(action).toEqual({ type: "movies/setSelectedMovieId", payload: 100 });
  });
});
