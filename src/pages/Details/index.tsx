import MainNav from "@/components/MainNav";
import MoviesList from "@/components/MoviesList";
import { useAppSelector } from "@/hooks/rtk";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetRelatedMoviesQuery,
} from "@/slices/moviesApi";
import type {
  Genre,
  SpokenLanguage,
  CrewMember,
  CastMember,
} from "@/types/movies";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock, FaRegThumbsDown, FaStar } from "react-icons/fa6";
import {
  IoBookmarkOutline,
  IoHeartOutline,
  IoPlayOutline,
  IoShareOutline,
} from "react-icons/io5";

import { useParams } from "react-router";

export default function Details() {
  const params = useParams();

  const selectedMovieId = useAppSelector(
    (state) => state.movies.selectedMovieId
  );

  const movieId =
    selectedMovieId !== -1 ? selectedMovieId : Number(params.movieId);

  const { data: movieDetails } = useGetMovieDetailsQuery(movieId);
  const { data: credits } = useGetMovieCreditsQuery(movieId);
  const { data: relatedMovies } = useGetRelatedMoviesQuery(movieId);

  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[] | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);

  const renderReleaseYear = (rd: string) => {
    const releaseDate = new Date(rd);

    return releaseDate.getFullYear();
  };

  useEffect(() => {
    if (credits) {
      const director = credits.crew.find(
        (member: CrewMember) => member.job === "Director"
      );
      const writers = credits.crew
        .filter((member: CrewMember) => member.job === "Screenplay")
        .map((writer: CrewMember) => writer.name);

      const languages = movieDetails.spoken_languages.map(
        (lang: SpokenLanguage) => lang.english_name
      );

      setDirector(director?.name || "");
      setWriters(writers);
      setLanguages(languages);
    }
  }, [credits, movieDetails]);

  if (!movieDetails || !credits || !relatedMovies) {
    return <div className="text-white">Loading Movie Details</div>;
  }

  return (
    <>
      <MainNav />
      <div className="movie-details relative min-h-[750px] h-screen overflow-hidden">
        <div className="absolute inset-0 bottom-0 left-0 right-0">
          {movieDetails.backdrop_path && (
            <img
              className="w-full h-full object-cover"
              alt={movieDetails.original_title}
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-alate-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40"></div>
        </div>
        <div className="absolute z-10 p-6 top-0 left-0 right-0">
          <div className="container mx-auto z-10">
            <div className="grid grid-cols-3 gap-8">
              <div></div>
              <div className="col-span-2">
                <h1 className="text-7xl font-bold text-white text-shadow-black text-shadow-md mb-4">
                  {movieDetails.original_title}
                </h1>
                <div className="text-lg text-shadow-black text-shadow-md flex flex-wrap gap-4 items-center text-slate-300 mb-2">
                  <div className="text-green-400 px-2 py-1 rounded-full flex items-center gap-2">
                    <FaStar className="text-lg" />
                    <span className="font-semibold py-0.5 leading-[1]">
                      8.5
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CiCalendar className="text-lg" />
                    <p className="leading-[1.1] pt-0.5">
                      {renderReleaseYear(movieDetails.release_date) ||
                        "Unknown"}
                    </p>
                  </div>
                  {movieDetails.runtime ? (
                    <div className="flex items-center gap-4">
                      <FaRegClock className="text-lg" />
                      <p className="leading-[1.1] pt-0.5">
                        {movieDetails.runtime} min
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-row flex-wrap gap-2 mb-6">
                  {movieDetails.genres.map((genre: Genre) => {
                    return (
                      <div
                        key={genre.id}
                        className="inline-flex justify-center items-center rounded-md border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-slate-300 text-sm"
                      >
                        <>{genre.name}</>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xl text-slate-200 text-shadow-black text-shadow-sm leading-relaxed max-w-3xl mb-8">
                  {movieDetails.overview}
                </p>
                <div className="options flex flex-wrap gap-4">
                  <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xs hover:bg-black/90 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-black/90">
                    <IoPlayOutline />
                    <span>Watch Trailer</span>
                  </button>
                  <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-[#0a0a0a] shadow-xs hover:bg-[#262626] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-slate-300 hover:text-white">
                    <IoHeartOutline />
                    <span>Add to Favorites</span>
                  </button>
                  <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-[#0a0a0a] shadow-xs hover:bg-[#262626] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-slate-300 hover:text-white">
                    <IoBookmarkOutline />
                    <span>Add to Watchlist</span>
                  </button>
                  <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-[#0a0a0a] shadow-xs hover:bg-[#262626] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-slate-300 hover:text-white">
                    <IoShareOutline />

                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <div className="tabs">
          <div className="tab">
            <div className="awards mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Related Movies
              </h2>
              <MoviesList related movies={relatedMovies} />
            </div>
          </div>
          <div className="tab">
            <div className="awards mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Awards & Recognition
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
                  <FaRegThumbsDown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />

                  <h4 className="font-semibold text-white">
                    No Awards to be found for this movie.
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="production-details mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-xl space-y-3">
                  <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                    <span className="text-slate-400">Director</span>
                    <span className="text-white text-right">{director}</span>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                    <span className="text-slate-400">Writers</span>
                    <span className="text-white text-right">
                      {writers?.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                    <span className="text-slate-400">Budget</span>
                    <span className="text-white text-right">
                      ${movieDetails.budget.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                    <span className="text-slate-400">Revenue</span>
                    <span className="text-white text-right">
                      ${movieDetails.revenue.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                    <span className="text-slate-400">Languages</span>
                    <span className="text-white text-right">
                      {languages?.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="cast mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
              <div className="grid grid-cols-3 gap-6">
                {credits?.cast.slice(0, 9).map((actor: CastMember) => (
                  <div
                    key={actor.id}
                    className="flex flex-col shadow-sm rounded-xl bg-slate-800/30 border-slate-700/30"
                  >
                    <div className="p-4 text-center basis-full w-full">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="rounded-lg w-full h-32 object-cover mb-3"
                      />
                      <h3 className="text-lg font-semibold text-white">
                        {actor.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="crew">
              <h2 className="text-3xl font-bold text-white mb-6">Crew</h2>
              <div className="grid grid-cols-2 gap-6">
                {credits.crew.slice(0, 10).map((crew: CrewMember) => {
                  return (
                    <div
                      key={crew.id}
                      className="flex flex-col shadow-sm rounded-xl bg-slate-800/30 border-slate-700/30"
                    >
                      <div className="p-4 text-left basis-full w-full">
                        <h3 className="text-lg font-semibold text-white">
                          {crew.name}
                        </h3>
                        <p className="text-sm text-slate-400">{crew.job}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
