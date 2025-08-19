import { Route, Routes } from "react-router";

import Home from "@pages/Home";
import Results from "@/pages/Results";
import Browse from "@/pages/Browse";
import Details from "@/pages/Details";

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
