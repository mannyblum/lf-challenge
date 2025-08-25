import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import Results from "./pages/Results";
import Browse from "./pages/Browse";
import Details from "./pages/Details";

import {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from "./slices/moviesApi";
import NotFound from "./components/common/NotFound";

function App() {
  useGetGenresQuery();
  useGetPopularMoviesQuery();
  useGetTrendingMoviesQuery();

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="results/:term" element={<Results />} />
      <Route path="browse" element={<Browse />} />
      <Route path="details/:movieId" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
