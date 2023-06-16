import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas'; 

import loadingReducer from './loadingSlice';
import placesToVisitReducer from './placesToVisitSlice';
import placesDisplayReducer from './placesDisplaySlice';
import scrollReducer from './scrollSlice'


const sagaMiddleware = createSagaMiddleware();

export default configureStore({
	reducer: {
		loading: loadingReducer,
		placesToVisit: placesToVisitReducer,
		placesDisplay: placesDisplayReducer,
		scroll: scrollReducer,
	},
	middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware], 
});


sagaMiddleware.run(rootSaga);
