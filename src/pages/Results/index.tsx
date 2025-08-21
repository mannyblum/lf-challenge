import MainNav from "@/components/MainNav";
import { useAppSelector } from "@/hooks/rtk";
import { useGetMoviesQuery } from "@/slices/moviesApi";
import MoviesList from "@/components/MoviesList";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";

export default function Results() {
  const navigate = useNavigate();

  const term = useAppSelector((state) => {
    return state.movies.searchTerm;
  });

  useEffect(() => {
    if (!term) {
      navigate("/", { replace: true });
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
      <>
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
      </>
    );
  }
}
