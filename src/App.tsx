// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { QueryClient } from "@tanstack/react-query";

// import {
//   moviesQueryOptions,
//   genresQueryOptions,
//   popularMoviesQueryOptions,
//   trendingMoviesQueryOptions,
// } from "./queryOptions/moviesQueryOptions";

// import { useMoviesContext } from "@/hooks/useMoviesContext";
// import { useMovieDetails } from "@/hooks/useMovieDetails";

import Home from "@pages/Home";
import Results from "@/pages/Results";
import Browse from "@/pages/Browse";
import Details from "@/pages/Details";
// import Loading from "@/components/Loading";
import { Route, Routes } from "react-router";
import {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from "./slices/moviesApi";

function App() {
  useGetGenresQuery();
  useGetPopularMoviesQuery();
  useGetTrendingMoviesQuery();

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="results/:term" element={<Results />} />
      <Route path="browse" element={<Browse />} />
      <Route path="details/:movieId" element={<Details />} />
    </Routes>
  );
}

export default App;
