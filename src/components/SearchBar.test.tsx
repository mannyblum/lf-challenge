import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { cleanup, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import ProviderWrapper from "@/context/ProviderWrapper";

describe("SearchBar", () => {
  beforeEach(() => {
    render(<SearchBar />, { wrapper: ProviderWrapper });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the SearchBar component", () => {
    const inputNode = screen.queryByLabelText("searchbar-label");
    expect(inputNode).toBeDefined();
  });

  it("should trigger handleChange as the user types", async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Search for movies...");
    await user.type(input, "batman");

    expect(input).toHaveValue("batman");
  });

  it("should focus input field if its empty", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search for movies...");

    await user.click(button);
    input.focus();

    expect(input).toHaveFocus();
  });

  it("should handle the form submission", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search for movies...");

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await user.type(input, "batman");
    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith("searchTerm: ", "batman");
    expect(button).toBeDefined();
  });
});
