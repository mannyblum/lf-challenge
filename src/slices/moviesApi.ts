import type { Genre, Movie, Credits } from "@/types/movies";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

/* Base Query Setup to insert API_KEY at end of each request*/

export const createBaseQueryWithApiKey = (
  baseQuery: ReturnType<typeof fetchBaseQuery>,
  apiKey: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    let newArgs = args;
    if (typeof newArgs === "string") {
      newArgs = { url: newArgs };
    }

    const { url, ...rest } = newArgs;
    const newUrl = `${url}${url.includes("?") ? "&" : "?"}api_key=${apiKey}`;

    return baseQuery({ url: newUrl, ...rest }, api, extraOptions);
  };
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.themoviedb.org/3/",
});

const baseQueryWithApiKey = createBaseQueryWithApiKey(baseQuery, API_KEY);

/* Endpoints to be used within the app */
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryWithApiKey,
  endpoints: (build) => ({
    getMovies: build.query({
      query: (term: string) => `search/movie?query=${term}`,
    }),
    getMovieDetails: build.query<Movie, number>({
      query: (movieId: number) => `movie/${movieId}?language=en-US`,
    }),
    getMovieCredits: build.query({
      query: (movieId: number) => `movie/${movieId}/credits?language=en-US`,
      transformResponse: (response: Credits) => response,
    }),
    getRelatedMovies: build.query({
      query: (movieId: number) => `movie/${movieId}/similar?language=en-US`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getGenres: build.query<Genre[], void>({
      query: () => "genre/movie/list",
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getPopularMovies: build.query<Movie[], void>({
      query: () => "movie/popular",
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getTrendingMovies: build.query<Movie[], void>({
      query: () => "trending/movie/day?language=en-US",
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetRelatedMoviesQuery,
  useGetGenresQuery,
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} = moviesApi;
