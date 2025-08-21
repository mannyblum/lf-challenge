import Results from ".";
import { render } from "../../utils/test-utils";
import { describe, it } from "vitest";

describe("Search Results", () => {
  it("renders the component", async () => {
    render(<Results />);
  });
});
