import MainNav from "@/components/MainNav";
import MoviesList from "@/components/MoviesList";
import { useMoviesContext } from "@/hooks/useMoviesContext";

export default function Browse() {
  const { state } = useMoviesContext();

  return (
    <>
      <MainNav />
      <div role="main" className="container mx-auto">
        <div className="my-8">
          <h2 className="text-3xl font-bold text-white mb-2">Popular Movies</h2>
          <p className="text-slate-400">
            {state.popularMovies?.length} movies found
          </p>
        </div>
        <MoviesList movies={state.popularMovies} />
      </div>
    </>
  );
}
