import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas'; 


import placesToVisitReducer from './placesToVisitSlice';
import placesDisplayReducer from './placesDisplaySlice';
import scrollReducer from './scrollSlice'
import searchReducer from './searchSlice';


const sagaMiddleware = createSagaMiddleware();

export default configureStore({
	reducer: {
		
		placesToVisit: placesToVisitReducer,
		placesDisplay: placesDisplayReducer,
		scroll: scrollReducer,
		search: searchReducer,
	},
	middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware], 
});


sagaMiddleware.run(rootSaga);
