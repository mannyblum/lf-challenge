import type { Movie } from "@/types/movies";
import type { Dispatch } from "react";
import { createContext } from "react";

interface MoviesState {
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
};

type Action = { type: "SET_SEARCH_TERM"; payload: string };

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export const reducer = (state: MoviesState, action: Action) => {
  switch (action.type) {
    case actions.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};
