import { render, screen } from "../utils/test-utils";
import { describe, it, expect, type Mock } from "vitest";

import NotFound from "./NotFound";

describe("NotFound Page", () => {
  it("renders not found page", async () => {
    render(<NotFound />);

    expect(screen.getByText(/Page Not found/i)).toBeInTheDocument();
  });
});
