import { createSlice } from '@reduxjs/toolkit'

const placesToVisitSlice = createSlice({
  name: 'placesToVisit',
  initialState: [],
  reducers: {
    addToVisit: (state, action) => {
    
      state.push(action.payload);
    },
    removeFromVisit: (state, action) => {
   
      return state.filter(place => place.place_id !== action.payload)
    },
  },
})

export const { addToVisit, removeFromVisit } = placesToVisitSlice.actions

export default placesToVisitSlice.reducer
