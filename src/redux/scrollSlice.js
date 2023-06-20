import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasScrolled: false,
  searchBarAndTitleHeight: 0
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setHasScrolled: (state, action) => {
      state.hasScrolled = action.payload;
    },
   
    setSearchBarAndTitleHeight: (state, action) => {
      state.searchBarAndTitleHeight = action.payload;
    }

  },
});

export const { setHasScrolled, setSearchBarAndTitleHeight  } = scrollSlice.actions;

export const selectHasScrolled = (state) => state.scroll.hasScrolled;

export default scrollSlice.reducer;
