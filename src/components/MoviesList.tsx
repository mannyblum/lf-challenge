import { useAppDispatch } from "@/hooks/rtk";
import { useGetGenresQuery } from "@/slices/moviesApi";
import { setSelectedMovieId } from "@/slices/moviesSlice";
import type { Movie } from "@/types/movies";

import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router";

interface MoviesListProps {
  movies: Movie[];
  related?: boolean;
}

export default function MoviesList({ movies, related }: MoviesListProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { data: genres } = useGetGenresQuery();

  const getGenreName = (genreId: number) => {
    return genres?.find((genre) => {
      return genre.id === genreId;
    });
  };

  const renderReleaseYear = (rd: string) => {
    const releaseDate = new Date(rd);

    return releaseDate.getFullYear();
  };

  const handleGetMovieDetails = (movieId: number) => {
    dispatch(setSelectedMovieId(movieId));
    navigate("/details/" + movieId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cardHeight = related ? "min-h-[300px]" : "min-h-[500px]";
  const classNames = `mb-8 flex flex-col gap-6 rounded-xl border shadow-sm bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 group cursor-pointer transition-all duration-300 hover:scale-105 ${cardHeight}`;

  return (
    <div
      data-testid="movie-list"
      className={`grid ${related ? "grid-cols-4" : "grid-cols-3"} gap-4`}
    >
      {movies.map((movie: Movie) => {
        return (
          <div
            key={movie.id}
            data-slot="card"
            onClick={() => handleGetMovieDetails(movie.id)}
            className={classNames}
          >
            <div data-slot="card-content h-full">
              <div className="relative h-full">
                <div className="absolute top-3 right-3 text-green-400 bg-black/70 px-2 py-1 rounded-full flex items-center gap-1.5">
                  <FaStar />
                  <span className="text-sm font-semibold py-0.5 leading-[1]">
                    8.5
                  </span>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className={`w-full h-80 object-cover object-top rounded-t-xl`}
                  alt={movie.original_title}
                />
                <div className="p-4">
                  <h4 className="text-white group-hover:text-purple-300 line-clamp-1 transition-colors font-semibold mb-2">
                    {movie.original_title}
                  </h4>
                  <div className="flex flex-col gap-4 justify-between`">
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                      <div className="flex items-center gap-1">
                        <CiCalendar className="text-lg" />
                        <p className="leading-[1.1] pt-0.5">
                          {renderReleaseYear(movie.release_date) || "Unknown"}
                        </p>
                      </div>
                      {movie.runtime &&
                        -(
                          <div className="flex items-center gap-1">
                            {movie.runtime}
                          </div>
                        )}
                    </div>
                    {!related && (
                      <>
                        <div className="flex flex-row flex-wrap gap-2 mb-2">
                          {movie.genre_ids.map((genreId) => {
                            const genreName =
                              getGenreName(genreId)?.name ?? null;

                            return (
                              <div
                                key={genreId}
                                className="inline-flex justify-center items-center rounded-md border border-transparent bg-slate-700/50 px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-slate-300 text-xs"
                              >
                                <>{genreName}</>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-5 justify-self-end">
                          {movie.overview || "No description available"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
