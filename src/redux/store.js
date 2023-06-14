import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import placesToVisitReducer from './placesToVisitSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    placesToVisit: placesToVisitReducer,
  },
});