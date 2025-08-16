import { describe, expect, it } from "vitest";
import { reducer, initialState, actions } from "./MoviesContext";

describe("movies reducer", () => {
  it("should set search term when action type is SET_SEARCH_TERM", () => {
    const action = { type: actions.SET_SEARCH_TERM, payload: "Batman" };
    const newState = reducer(initialState, action);

    expect(newState.searchTerm).toBe("Batman");
    expect(newState.movies).toBeNull();
  });

  it("should return the same state for unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION" } as any; // cast to any to bypass TS
    const newState = reducer(initialState, action);

    expect(newState).toBe(initialState); // same object reference
  });
});
