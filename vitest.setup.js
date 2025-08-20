import "@testing-library/jest-dom";

import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./test/server";

// Start the server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test so tests are isolated
afterEach(() => server.resetHandlers());

// Clean up once all tests are done
afterAll(() => server.close());
