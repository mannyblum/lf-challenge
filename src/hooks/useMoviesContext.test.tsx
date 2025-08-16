import { renderHook } from "@testing-library/react";
import { useMoviesContext } from "./useMoviesContext";
import { MoviesContext } from "@/context/MoviesContext";
import { describe, expect, it, vi } from "vitest";

describe("useMoviesContext", () => {
  it("should throw an error if used outside of MoviesProvider", () => {
    expect(() => renderHook(() => useMoviesContext())).toThrow(
      "useMoviesContext must be used within MoviesProvider"
    );
  });

  it("should return context if used inside MoviesProvider", () => {
    const mockValue = {
      state: { searchTerm: "Batman", movies: null },
      dispatch: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MoviesContext.Provider value={mockValue}>
        {children}
      </MoviesContext.Provider>
    );

    const { result } = renderHook(() => useMoviesContext(), { wrapper });

    expect(result.current).toBe(mockValue);
  });
});
