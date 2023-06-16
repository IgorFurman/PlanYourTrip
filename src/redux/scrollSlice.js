import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasScrolled: false,
  searchBarHeight: 0,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setHasScrolled: (state, action) => {
      state.hasScrolled = action.payload;
    },
   
    setSearchBarHeight: (state, action) => { 
      state.searchBarHeight = action.payload;
    },
  },
});

export const { setHasScrolled, setSearchBarHeight  } = scrollSlice.actions;

export const selectHasScrolled = (state) => state.scroll.hasScrolled;

export default scrollSlice.reducer;
