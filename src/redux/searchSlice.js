// w pliku searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  hasSearched: false, 
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload;
    },
    setHasSearched: (state, action) => { 
      state.hasSearched = action.payload;
    },
  },
});

export const { setSearch, setHasSearched } = searchSlice.actions;

export const selectSearch = (state) => state.search.value;
export const selectHasSearched = (state) => state.search.hasSearched; 

export default searchSlice.reducer;
