import MainNav from "../../components/common/MainNav";
import MoviesList from "../../components/MoviesList";

import { useGetPopularMoviesQuery } from "../../slices/moviesApi";

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
      <div role="main" className="container h-full w-full mx-auto">
        <div className="flex flex-col py-5 px-4 items-center mx-auto bg-[#050a1b]">
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
        </div>
      </div>
    );
  }
}
