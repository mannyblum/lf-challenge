import { queryOptions } from "@tanstack/react-query";

const API_KEY = "676b37a6ad0aaaa61a566c3097c60afe";

export function moviesQueryOptions(term: string) {
  return queryOptions({
    queryKey: ["movies", term],
    queryFn: () => {
      if (!term) return Promise.resolve(null);

      return fetchMovies(term);
    },
    enabled: !!term,
    staleTime: 1,
    gcTime: 1,
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

export function genresQueryOptions() {
  return queryOptions({
    queryKey: ["genres"],
    queryFn: () => {
      return fetchGenres();
    },
    staleTime: 1,
    gcTime: 1,
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

export function popularMoviesQueryOptions() {
  return queryOptions({
    queryKey: ["popular-movies"],
    queryFn: () => {
      return fetchPopularMovies();
    },
    staleTime: 1,
    gcTime: 1,
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

export function trendingMoviesQueryOptions() {
  return queryOptions({
    queryKey: ["trending-movies"],
    queryFn: () => {
      return fetchTrendingMovies();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

const fetchMovies = async (term: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${term}&api_key=${API_KEY}`
  );

  return await response.json();
};

const fetchGenres = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return await response.json();
};

const fetchPopularMovies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return await response.json();
};

const fetchTrendingMovies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`
  );
  return await response.json();
};
