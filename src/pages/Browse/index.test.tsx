import { describe, expect, it } from "vitest";
import { render, screen } from "../../utils/test-utils";
import Browse from ".";
// import { server } from "../../../test/server";
// import { delay, http, HttpResponse } from "msw";

describe("Browse", () => {
  // beforeEach(() => {
  //   server.resetHandlers();
  // });

  it("should render the Browse page", () => {
    render(<Browse />);

    expect(screen.findByText(/Popular Movies/i)).toBeDefined();
  });

  it("should render movielist if popularMovie data is fetched successfully", async () => {
    render(<Browse />);

    expect(
      await screen.findByRole("heading", { name: /Popular Movies/i })
    ).toBeDefined();
    expect(await screen.findByText(/4 movies found/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spaceballs/i)).toBeInTheDocument();
  });

  // it("renders error when query fails", async () => {
  //   // Override the handler to return 500
  //   server.use(
  //     http.get("https://api.themoviedb.org/3/movie/popular", async () => {
  //       await delay(150);
  //       return HttpResponse.json(
  //         { message: "Internal Server Error" },
  //         { status: 500 }
  //       );
  //     })
  //   );

  //   render(<Browse />);

  //   // wait for the error div to appear
  //   const errorEl = await screen.findByText(/Error:/i);
  //   expect(errorEl).toBeInTheDocument();

  //   // Optionally, assert it includes the JSON stringified error
  //   expect(errorEl.textContent).toMatch(/Internal Server Error/i);
  // });
});
