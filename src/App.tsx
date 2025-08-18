import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Home from "@pages/Home";
import Results from "./pages/Results";

import { useMoviesContext } from "./hooks/useMoviesContext";

import {
  moviesQueryOptions,
  genresQueryOptions,
  popularMoviesQueryOptions,
  trendingMoviesQueryOptions,
} from "./queryOptions/moviesQueryOptions";
import { QueryClient } from "@tanstack/react-query";
import Browse from "./pages/Browse";
import Loading from "./components/Loading";

function App() {
  const { state, dispatch } = useMoviesContext();
  const queryClient = new QueryClient();

  const {
    isFetching: fetchingMovies,
    isError,
    data: movies,
    error,
    refetch: refetchMovies,
  } = useQuery(moviesQueryOptions(state.searchTerm));
  const { data: genresData } = useQuery(genresQueryOptions());
  const { data: popularMoviesData } = useQuery(popularMoviesQueryOptions());
  const { data: trendingMoviesData } = useQuery(trendingMoviesQueryOptions());

  useEffect(() => {
    dispatch({ type: "RESET_MOVIES" });
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
  }, []);

  useEffect(() => {
    if (genresData) {
      dispatch({ type: "SET_GENRES", payload: genresData.genres });
    }
  }, [genresData, dispatch]);

  useEffect(() => {
    if (trendingMoviesData.results) {
      dispatch({
        type: "SET_TRENDING_MOVIES",
        payload: trendingMoviesData.results,
      });
    }
  }, [trendingMoviesData, dispatch]);

  useEffect(() => {
    if (popularMoviesData.results) {
      dispatch({
        type: "SET_POPULAR_MOVIES",
        payload: popularMoviesData.results,
      });
    }
  }, [popularMoviesData, dispatch]);

  useEffect(() => {
    if (movies?.results) {
      dispatch({ type: "SET_MOVIES", payload: movies.results });
      dispatch({ type: "SET_CURRENT_NAV", payload: "search" });
    }
  }, [movies, dispatch]);

  useEffect(() => {
    if (state.searchTerm.length > 0) {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      refetchMovies();
    }
  }, [state]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log("state: ", state);

  if (fetchingMovies && !movies) {
    return <Loading />;
  }

  const renderPage = () => {
    switch (state.currentNav) {
      case "home":
        return <Home />;
      case "search":
        return <Results />;
      case "browse":
        return <Browse />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;

// TODO: details page
//      use movie credits api
//      use details api
// TODO: trending now
// TODO: call to action
// TODO: browse page (OPTIONAL)
//     popular movies api
