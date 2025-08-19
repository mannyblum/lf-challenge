import { createSlice } from "@reduxjs/toolkit";

import type { Genre, Movie } from "../types/movies";

interface MoviesState {
  movies: Movie[];
  searchTerm: string;
  genres: Genre[];
  selectedMovieId: number;
}

const initialState: MoviesState = {
  movies: [],
  genres: [],
  searchTerm: "",
  selectedMovieId: -1,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.results;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
  },
});

export const { setMovies, setSearchTerm, setGenres, setSelectedMovieId } =
  movieSlice.actions;
export default movieSlice.reducer;
