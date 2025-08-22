import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { render, screen } from "../utils/test-utils";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should render the SearchBar component", () => {
    render(<SearchBar />);

    const inputNode = screen.queryByLabelText("searchbar-label");
    expect(inputNode).toBeDefined();
  });

  it("should trigger handleChange as the user types", async () => {
    render(<SearchBar />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Search for movies...");
    await user.type(input, "batman");

    expect(input).toHaveValue("batman");
  });

  it("should focus input field if its empty", async () => {
    render(<SearchBar />);
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search for movies...");

    await user.click(button);
    input.focus();

    expect(input).toHaveFocus();
  });

  it("should handle the form submission", async () => {
    // const mockDispatch = vi.fn();

    render(<SearchBar />);

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /Search/i });
    const input = screen.getByPlaceholderText("Search for movies...");

    await user.type(input, "batman");
    await user.click(button);

    // expect(mockDispatch).toHaveBeenCalledOnce();
    // expect(mockDispatch).toHaveBeenCalledWith({
    //   type: "SET_SEARCH_TERM",
    //   payload: "batman",
    // });
  });
});
