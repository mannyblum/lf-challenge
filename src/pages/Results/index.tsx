import MainNav from "@/components/MainNav";
import { useAppSelector } from "@/hooks/rtk";
import { useGetMoviesQuery } from "@/slices/moviesApi";
import MoviesList from "@/components/MoviesList";
import { useNavigate } from "react-router";
import { useEffect } from "react";

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

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error:</div>;

  if (isSuccess && !movies?.length) {
    return (
      <>
        <MainNav />
        <div role="main" className="container mx-auto">
          <div className="my-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Search Results for "{term}"
            </h2>
            <p className="text-slate-400">{movies?.length} movies found</p>
          </div>
          {movies.results && <MoviesList movies={movies.results} />}
        </div>
      </>
    );
  }
}
