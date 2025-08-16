import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import ProviderWrapper from "@/context/ProviderWrapper";
import { MoviesContext } from "@/context/MoviesContext";

describe("SearchBar", () => {
  it("should render the SearchBar component", () => {
    render(<SearchBar />, { wrapper: ProviderWrapper });

    const inputNode = screen.queryByLabelText("searchbar-label");
    expect(inputNode).toBeDefined();
  });

  it("should trigger handleChange as the user types", async () => {
    render(<SearchBar />, { wrapper: ProviderWrapper });

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Search for movies...");
    await user.type(input, "batman");

    expect(input).toHaveValue("batman");
  });

  it("should focus input field if its empty", async () => {
    render(<SearchBar />, { wrapper: ProviderWrapper });

    const user = userEvent.setup();

    const button = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search for movies...");

    await user.click(button);
    input.focus();

    expect(input).toHaveFocus();
  });

  it("should handle the form submission", async () => {
    const mockDispatch = vi.fn();

    render(
      <MoviesContext.Provider
        value={{
          state: { searchTerm: "", movies: null, genres: null },
          dispatch: mockDispatch,
        }}
      >
        <SearchBar />
      </MoviesContext.Provider>
    );

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /Search/i });
    const input = screen.getByPlaceholderText("Search for movies...");

    await user.type(input, "batman");
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SEARCH_TERM",
      payload: "batman",
    });
  });
});
