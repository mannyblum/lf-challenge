import type { Movie } from "@/types/movies";
import type { Dispatch } from "react";
import { createContext } from "react";

export interface MoviesState {
  searchTerm: string;
  movies: Movie[] | null;
}

interface MoviesContextType {
  state: MoviesState;
  dispatch: Dispatch<Action>;
}

export const initialState: MoviesState = {
  searchTerm: "",
  movies: null,
};

export const actions = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_MOVIES: "SET_MOVIES",
};

type Action =
  | { type: typeof actions.SET_SEARCH_TERM; payload: string }
  | { type: typeof actions.SET_MOVIES; payload: Movie[] };

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export const reducer = (state: MoviesState, action: Action) => {
  switch (action.type) {
    case actions.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actions.SET_MOVIES:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};
