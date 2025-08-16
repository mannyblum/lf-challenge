import { useReducer, type ReactNode } from "react";
import { initialState, MoviesContext, reducer } from "./MoviesContext";

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
