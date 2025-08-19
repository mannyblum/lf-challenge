import type { Genre, Movie, Credits } from "@/types/movies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (build) => ({
    getMovies: build.query({
      query: (term: string) => `search/movie?query=${term}&api_key=${API_KEY}`,
    }),
    getMovieDetails: build.query({
      query: (movieId: number) =>
        `movie/${movieId}?language=en-US&&api_key=${API_KEY}`,
    }),
    getMovieCredits: build.query({
      query: (movieId: number) =>
        `movie/${movieId}/credits?language=en-US&&api_key=${API_KEY}`,
      transformResponse: (response: Credits) => response,
    }),
    getRelatedMovies: build.query({
      query: (movieId: number) =>
        `movie/${movieId}/similar?language=en-US&&api_key=${API_KEY}`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getGenres: build.query<Genre[], void>({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getPopularMovies: build.query<Movie[], void>({
      query: () => `movie/popular?api_key=${API_KEY}`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getTrendingMovies: build.query<Movie[], void>({
      query: () => `trending/movie/day?language=en-US&api_key=${API_KEY}`,
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
