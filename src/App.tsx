import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Home from "@pages/Home";
import Results from "./pages/Results";

import { useMoviesContext } from "./hooks/useMoviesContext";

import moviesQueryOptions from "./queryOptions/moviesQueryOptions";

function App() {
  const { state, dispatch } = useMoviesContext();

  const { isFetching, isSuccess, isError, data, error, refetch } = useQuery(
    moviesQueryOptions(state.searchTerm)
  );

  useEffect(() => {
    if (state.searchTerm.length > 0) {
      refetch();
    }
  }, [state]);

  useEffect(() => {
    if (data?.results) {
      dispatch({ type: "SET_MOVIES", payload: data.results });
    }
  }, [data]);

  console.log("state", state);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div role="main" className="container mx-auto">
      {isSuccess && !isFetching && data.results ? <Results /> : <Home />}
    </div>
  );
}

export default App;

// TODO: setup react-query
// TODO: finish connecting to API
// TODO: results page
// TODO: details page
// TODO: browse page (OPTIONAL)
