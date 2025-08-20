import "@testing-library/jest-dom";

import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./test/server";

// Make sure fetch & AbortController are consistent
import { fetch, Headers, Request, Response } from "undici";

global.fetch = fetch as any;
global.Headers = Headers as any;
global.Request = Request as any;
global.Response = Response as any;

// Start the server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test so tests are isolated
afterEach(() => server.resetHandlers());

// Clean up once all tests are done
afterAll(() => server.close());
