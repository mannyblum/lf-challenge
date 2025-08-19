import { useAppDispatch } from "@/hooks/rtk";
import { useGetTrendingMoviesQuery } from "@/slices/moviesApi";
import { setSelectedMovieId } from "@/slices/moviesSlice";
import { FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function Trending() {
  // TODO: implement loading
  const { data, isLoading, isSuccess } = useGetTrendingMoviesQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const trendingMovies = data || [];
  const topFive = trendingMovies.slice(0, 5);

  const handleGetMovieDetails = (movieId: number) => {
    dispatch(setSelectedMovieId(movieId));
    navigate("/details/" + movieId);
  };

  if (!isSuccess) return;

  return (
    <div className="flex flex-col justify-center mx-16">
      <div className="flex items-center justify-center gap-4 mb-6">
        <FiTrendingUp className="text-purple-400 h-5 w-5 font-semibold" />
        <h3 className="text-lg font-semibold text-slate-300">Trending Now</h3>
      </div>
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {topFive?.map((movie) => {
          return (
            <li
              key={movie.id}
              onClick={() => handleGetMovieDetails(movie.id)}
              className="px-4 py-2 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 hover:border-slate-600/50 rounded-full text-slate-300 hover:text-white transition-all duration-200 hover:scale-105 backdrop-blur-sm"
            >
              {movie.original_title || movie.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
