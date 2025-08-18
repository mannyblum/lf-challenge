import type { Genre, Movie } from "@/types/movies";
import type { Dispatch } from "react";
import { createContext } from "react";

export interface MoviesState {
  searchTerm: string;
  movies: Movie[] | null;
  trendingMovies: Movie[] | null;
  popularMovies: Movie[] | null;
  genres: Genre[] | null;
  currentNav: string;
  selectedMovie: Movie | null;
}

interface MoviesContextType {
  state: MoviesState;
  dispatch: Dispatch<Action>;
}

export const initialState: MoviesState = {
  searchTerm: "",
  trendingMovies: null,
  popularMovies: null,
  movies: null,
  genres: null,
  selectedMovie: null,
  currentNav: "home",
};

export const actions = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_MOVIES: "SET_MOVIES",
  SET_TRENDING_MOVIES: "SET_TRENDING_MOVIES",
  SET_POPULAR_MOVIES: "SET_POPULAR_MOVIES",
  SET_GENRES: "SET_GENRES",
  SET_CURRENT_NAV: "SET_CURRENT_NAV",
  SET_SELECTED_MOVIE: "SET_SELECTED_MOVIE",
  RESET_MOVIES: "RESET_MOVIES",
} as const;

type Action =
  | { type: typeof actions.SET_SEARCH_TERM; payload: string }
  | { type: typeof actions.SET_MOVIES; payload: Movie[] }
  | { type: typeof actions.SET_TRENDING_MOVIES; payload: Movie[] }
  | { type: typeof actions.SET_POPULAR_MOVIES; payload: Movie[] }
  | { type: typeof actions.SET_GENRES; payload: Genre[] }
  | { type: typeof actions.SET_CURRENT_NAV; payload: string }
  | { type: typeof actions.SET_SELECTED_MOVIE; payload: Movie }
  | { type: typeof actions.RESET_MOVIES };

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export const reducer = (state: MoviesState, action: Action) => {
  switch (action.type) {
    case actions.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actions.SET_MOVIES:
      return { ...state, movies: action.payload };
    case actions.SET_TRENDING_MOVIES:
      return { ...state, trendingMovies: action.payload };
    case actions.SET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case actions.SET_GENRES:
      return { ...state, genres: action.payload };
    case actions.SET_CURRENT_NAV:
      return { ...state, currentNav: action.payload };
    case actions.SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case actions.RESET_MOVIES:
      return { ...state, movies: null };

    default:
      return state;
  }
};
