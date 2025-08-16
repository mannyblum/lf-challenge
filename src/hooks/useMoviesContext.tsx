import { MoviesContext } from "@/context/MoviesContext";
import { useContext } from "react";

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMoviesContext must be used within MoviesProvider");
  }

  return context;
};
