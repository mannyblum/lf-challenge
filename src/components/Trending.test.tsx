import { render, screen } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";

import Trending from "./Trending";

describe("Trending Component", () => {
  it("renders the component", () => {
    render(<Trending />);

    console.log("screen", screen);

    // expect(screen.getByText(/Trending Now/)).toBeDefined();
  });
});
