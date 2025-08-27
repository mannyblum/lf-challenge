import { useEffect } from "react";

import { useAppSelector } from "../../hooks/rtk";

import { useGetMoviesQuery } from "../../slices/moviesApi";

import MoviesList from "../../components/MoviesList";
import MainNav from "../../components/common/MainNav";
import Loading from "../../components/common/Loading";
import NotFound from "../../components/common/NotFound";
import { useLocation } from "wouter";

export default function Results() {
  const [_, navigate] = useLocation();

  const term = useAppSelector((state) => {
    return state.movies.searchTerm;
  });

  useEffect(() => {
    if (!term) {
      navigate("/");
    }
  }, [term, navigate]);

  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
  } = useGetMoviesQuery(term, { skip: !term });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error:</div>;

  if (isSuccess && movies?.results?.length > 0) {
    return (
      <div role="main" className="container h-full w-full mx-auto">
        <div className="flex flex-col py-5 px-4 items-center mx-auto bg-[#050a1b]">
          <MainNav />
          <div role="main" className="container mx-auto px-4">
            <div className="my-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Search Results for "{term}"
              </h2>
              <p className="text-slate-400">
                {movies?.results.length} movies found
              </p>
            </div>
            {movies.results.length > 0 ? (
              <MoviesList movies={movies.results} />
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </div>
    );
  }
}
