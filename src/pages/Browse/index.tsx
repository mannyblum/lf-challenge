import MainNav from "@/components/MainNav";
import MoviesList from "@/components/MoviesList";
import { useGetPopularMoviesQuery } from "@/slices/moviesApi";

export default function Browse() {
  const {
    data: popularMovies,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPopularMoviesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isSuccess && popularMovies.length > 0) {
    return (
      <>
        <MainNav />
        <div role="main" className="container mx-auto px-4 py-8">
          <div className="my-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Popular Movies
            </h2>
            <p className="text-slate-400">
              {popularMovies.length} movies found
            </p>
          </div>
          <MoviesList movies={popularMovies} />
        </div>
      </>
    );
  }
}
