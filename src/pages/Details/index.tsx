// import { useParams } from "react-router";
import { useEffect } from "react";
import { useParams } from "wouter";

import { CiCalendar } from "react-icons/ci";
import { FaRegClock, FaStar } from "react-icons/fa6";
import {
  IoBookmarkOutline,
  IoHeartOutline,
  IoPlayOutline,
  IoShareOutline,
} from "react-icons/io5";

import { useAppSelector } from "../../hooks/rtk";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetRelatedMoviesQuery,
} from "../../slices/moviesApi";

import type { Genre } from "../../types/movies";

import MovieDetailsExtra from "../../components/MovieDetailsExtra";
import Loading from "../../components/common/Loading";
import MainNav from "../../components/common/MainNav";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderReleaseYear = (rd: string) => {
    if (!rd) return null;

    const releaseDate = new Date(rd);

    return releaseDate.getFullYear();
  };

  if (!movieDetails || !credits || !relatedMovies) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <MainNav />
      <div className="movie-details relative overflow-hidden h-[600px]">
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
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
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
                      <FaRegClock
                        data-testid="FaRegClock"
                        className="text-lg"
                      />
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
                <p className="text-xl text-slate-200 text-shadow-black text-shadow-sm leading-relaxed max-w-3xl mb-8 line-clamp-5">
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
      <MovieDetailsExtra
        movieDetails={movieDetails}
        credits={credits}
        relatedMovies={relatedMovies}
      />
    </div>
  );
}
