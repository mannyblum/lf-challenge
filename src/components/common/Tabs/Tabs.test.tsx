import { render, screen } from "../../../utils/test-utils";
import { describe, it, expect } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("should render the tabs container", () => {
    render(<Tabs>Some Child</Tabs>);

    expect(screen.getByTestId("detail-tabs")).toBeInTheDocument();
  });
});
