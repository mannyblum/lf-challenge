import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { createBaseQueryWithApiKey, moviesApi } from "./moviesApi"; // adjust import path
import type { FetchArgs } from "@reduxjs/toolkit/query/react";

// Mock the original fetchBaseQuery so we can inspect calls
vi.mock("@reduxjs/toolkit/query/react", async () => {
  const actual = await vi.importActual("@reduxjs/toolkit/query/react");
  return {
    ...actual,
    baseQuery: vi.fn(() => Promise.resolve({ data: "ok" })),
  };
});

vi.mock("../moviesApi", () => ({
  ...vi.importActual("../moviesApi"),
  baseQuery: vi.fn(() => Promise.resolve({ data: "ok" })),
}));

// Mock data
const mockMovies = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    title: "Robin Hood",
    budget: 1000000,
    runtime: 90,
    genre_ids: [1, 2, 3],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 2,
        name: "Adventure",
      },
      {
        id: 3,
        name: "Comedy",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 2,
    original_title: "Spaceballs",
    title: "Spaceballs",
    budget: 2000000,
    runtime: 90,
    genre_ids: [1, 4, 3],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 4,
        name: "Drama",
      },
      {
        id: 3,
        name: "Comedy",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    title: "Blazing Saddles",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1, 5, 4],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 4,
        name: "Drama",
      },
      {
        id: 5,
        name: "Romance",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 4,
    title: "Life of Brian",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1],
    genres: [
      {
        id: 1,
        name: "Action",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
];

const mockGenres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Adventure",
  },
  {
    id: 3,
    name: "Comedy",
  },
  {
    id: 4,
    name: "Drama",
  },
  {
    id: 5,
    name: "Romance",
  },
];

const mockCredits = {
  movieId: "1",
  results: {
    id: 1,
    cast: [
      {
        id: 1,
        name: "Rick Moranis",
        original_name: "Rick Moranis",
        profile_path: "urlToPhoto.jpg",
        character: "Lord Helmet",
      },
    ],
    crew: [
      {
        id: 1,
        name: "Ezra Swerdlow",
        job: "Producer",
      },
      {
        id: 2,
        name: "Thomas Meehan",
        job: "Screenplay",
      },
      {
        id: 3,
        name: "Ronny Graham",
        job: "Screenplay",
      },
      {
        id: 4,
        name: "Mel Brooks",
        job: "Director",
      },
    ],
  },
};

// Setup MSW server
const server = setupServer(
  http.get("https://api.themoviedb.org/3/movie/popular", () => {
    return HttpResponse.json({ results: mockMovies });
  }),
  http.get("https://api.themoviedb.org/3/genre/movie/list", () => {
    return HttpResponse.json({ genres: mockGenres });
  }),
  http.get("https://api.themoviedb.org/3/movie/1/credits", () => {
    return HttpResponse.json(mockCredits);
  }),
  http.get("https://api.themoviedb.org/3/movie/1/similar", () => {
    return HttpResponse.json({ results: mockMovies });
  }),
  http.get("https://api.themoviedb.org/3/movie/1", () => {
    return HttpResponse.json({ id: 1, title: "Movie One" });
  }),
  http.get("https://api.themoviedb.org/3/trending/movie/day", () => {
    return HttpResponse.json({ results: mockMovies });
  }),
  http.get("https://api.themoviedb.org/3/search/movie", () => {
    return HttpResponse.json({ results: mockMovies });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Create store with the API reducer
const makeStore = () =>
  configureStore({
    reducer: {
      [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (gDM) => gDM().concat(moviesApi.middleware),
  });

describe("moviesApi", () => {
  it("fetches popular movies", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getPopularMovies.initiate()
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual(mockMovies);
  });

  it("fetches genres", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getGenres.initiate()
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual(mockGenres);
  });

  it("fetches movie details", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getMovieDetails.initiate(1)
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual({
      id: 1,
      original_title: "Robin Hood: Men in Tights",
      title: "Robin Hood",
      budget: 1000000,
      runtime: 90,
      genre_ids: [1, 2, 3],
      genres: [
        {
          id: 1,
          name: "Action",
        },
        {
          id: 2,
          name: "Adventure",
        },
        {
          id: 3,
          name: "Comedy",
        },
      ],
      spoken_languages: [
        { iso_639_1: 123, name: "English", english_name: "English" },
        { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
      ],
      release_date: "2025-05-17",
    });
  });

  it("fetches movie credits", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getMovieCredits.initiate(1)
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual(mockCredits);
  });

  it("fetches related movies", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getRelatedMovies.initiate(1)
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual(mockMovies);
  });

  it("fetches trending movies", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getTrendingMovies.initiate()
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual(mockMovies);
  });

  it("fetches movies by search term", async () => {
    const store = makeStore();

    const result = await store.dispatch(
      moviesApi.endpoints.getMovies.initiate("Spaceballs")
    );

    expect(result.status).toBe("fulfilled");
    expect(result.data.results).toEqual(mockMovies[0]);
  });

  it("appends api_key when url has no query params", async () => {
    const mockBaseQuery = vi.fn().mockResolvedValue({ data: "ok" });
    const fakeApiKey = "123abc";
    const wrapped = createBaseQueryWithApiKey(mockBaseQuery, fakeApiKey);

    const args: FetchArgs = { url: "movie/popular" };
    await wrapped(args, {} as any, {} as any);

    expect(mockBaseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "movie/popular?api_key=123abc",
      }),
      {},
      {}
    );
  });

  it("appends api_key with & when url already has query params", async () => {
    const mockBaseQuery = vi.fn().mockResolvedValue({ data: "ok" });
    const fakeApiKey = "123abc";
    const wrapped = createBaseQueryWithApiKey(mockBaseQuery, fakeApiKey);

    const args: FetchArgs = { url: "search/movie?query=batman" };
    await wrapped(args, {} as any, {} as any);

    expect(mockBaseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "search/movie?query=batman&api_key=123abc",
      }),
      {},
      {}
    );
  });
});
