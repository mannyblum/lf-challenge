import { createSlice } from "@reduxjs/toolkit";

interface MoviesState {
  searchTerm: string;
  selectedMovieId: number;
}

const initialState: MoviesState = {
  searchTerm: "",
  selectedMovieId: -1,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedMovieId } = movieSlice.actions;
export default movieSlice.reducer;
