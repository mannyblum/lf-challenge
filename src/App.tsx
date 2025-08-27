import { Route, Router, Switch } from "wouter";
import { memoryLocation } from "wouter/memory-location";

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

  const { hook } = memoryLocation({
    path: "/",
    record: true,
  });

  return (
    <Router hook={hook}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="results/:term" component={Results} />
        <Route path="browse" component={Browse} />
        <Route path="details/:movieId" component={Details} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
