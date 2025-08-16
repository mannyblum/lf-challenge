import type { Genre, Movie } from "@/types/movies";
import type { Dispatch } from "react";
import { createContext } from "react";

export interface MoviesState {
  searchTerm: string;
  movies: Movie[] | null;
  genres: Genre[] | null;
}

interface MoviesContextType {
  state: MoviesState;
  dispatch: Dispatch<Action>;
}

export const initialState: MoviesState = {
  searchTerm: "",
  movies: null,
  genres: null,
};

export const actions = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_MOVIES: "SET_MOVIES",
  SET_GENRES: "SET_GENRES",
} as const;

type Action =
  | { type: typeof actions.SET_SEARCH_TERM; payload: string }
  | { type: typeof actions.SET_MOVIES; payload: Movie[] }
  | { type: typeof actions.SET_GENRES; payload: Genre[] };

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export const reducer = (state: MoviesState, action: Action) => {
  switch (action.type) {
    case actions.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actions.SET_MOVIES:
      return { ...state, movies: action.payload as Movie[] };
    case actions.SET_GENRES:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
};
