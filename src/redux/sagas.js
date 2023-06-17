import { put, takeLatest, call, all, select, delay } from 'redux-saga/effects';

import axios from 'axios';
import {
  setMapSettings,
  setLastSearchedCoordinates,
  setLastSearchedCity,
  setSelectedPlace,
  setPlaces,
  setHotels,
  setRestaurants,
  setFetchingPlaces,
  clearHotels,
  clearRestaurants,
  clearPlaces,
 
} from './placesDisplaySlice';


import {  setHasScrolled } from './scrollSlice'

// fetch searchBar (with clear data)
export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_HOTELS = 'FETCH_HOTELS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_PLACE_DETAILS = 'FETCH_PLACE_DETAILS';

// fetch lists (only data no clear others lists)

export const APPEND_FETCH_PLACES = 'APPEND_FETCH_PLACES';
export const APPEND_FETCH_HOTELS = 'APPEND_FETCH_HOTELS';
export const APPEND_FETCH_RESTAURANTS = 'APPEND_FETCH_RESTAURANTS';



function* fetchPlaces(action) {
  yield all([
    put(setFetchingPlaces(true)),
    put(setHasScrolled(false))
  ]);
  
  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/attractions?query=${action.payload}`);
    if (response.data && response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;

      yield all([
        put(setPlaces(response.data.results)),
        put(setMapSettings({ center: { lat, lng }, zoom: 12 })),
        put(setLastSearchedCoordinates({ lat, lng })),
        put(setLastSearchedCity(action.payload)),
        put(setSelectedPlace(null)),
        
      ]);
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  }  finally {
    yield all([
      put(setFetchingPlaces(false)),
      put(setHasScrolled(true))
    ]);
  }
}

function* fetchHotels(action) {
  yield all([
    put(setFetchingPlaces(true)),
    put(setHasScrolled(false))
  ]);
  
  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);

  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/hotels?query=${action.payload}`);
    if (response.data && response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;

      yield all([
        put(setHotels(response.data.results)),
        put(setMapSettings({ center: { lat, lng }, zoom: 12 })),
        put(setLastSearchedCoordinates({ lat, lng })),
        put(setLastSearchedCity(action.payload)),
        put(setSelectedPlace(null)),
      ]);
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  }   finally {
    yield all([
      put(setFetchingPlaces(false)),
      put(setHasScrolled(true))
    ]);
  }
}

function* fetchRestaurants(action) {
  yield all([
    put(setFetchingPlaces(true)),
    put(setHasScrolled(false))
  ]);

  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);

  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/restaurants?query=${action.payload}`);

    if (response.data && response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;

      yield all([
        put(setRestaurants(response.data.results)),
        put(setMapSettings({ center: { lat, lng }, zoom: 12 })),
        put(setLastSearchedCoordinates({ lat, lng })),
        put(setLastSearchedCity(action.payload)),
        put(setSelectedPlace(null)),
      ]);
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  }   finally {
    yield all([
      put(setFetchingPlaces(false)),
      put(setHasScrolled(true))
    ]);
  }
}

function* fetchPlaceDetails(action) {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/api/place/details?placeId=${action.payload}`
    );

    if (response.data) {
      yield put(setSelectedPlace(response.data));
    } else {
      console.log('No place details found.');
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
  }
}

function* appendFetchPlaces(action) {
  yield put(setFetchingPlaces(true));
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/attractions?query=${action.payload}`);
    if (response.data && response.data.results && response.data.results.length > 0) {
      yield put(setPlaces([...yield select(state => state.placesDisplay.places), ...response.data.results]));
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  } finally {
    yield put(setFetchingPlaces(false));

  }
}


function* appendFetchHotels(action) {
  yield put(setFetchingPlaces(true));
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/hotels?query=${action.payload}`);
    if (response.data && response.data.results && response.data.results.length > 0) {
      yield put(setHotels([...yield select(state => state.placesDisplay.hotels), ...response.data.results]));
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  } finally {
    yield put(setFetchingPlaces(false));
  }
}

function* appendFetchRestaurants(action) {
  yield put(setFetchingPlaces(true));
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/place/restaurants?query=${action.payload}`);
   
    if (response.data && response.data.results && response.data.results.length > 0) {
      yield put(setRestaurants([...yield select(state => state.placesDisplay.restaurants), ...response.data.results]));
    }
  } catch (error) {
    console.error('Error searching Google Places API:', error);
  } finally {
    yield put(setFetchingPlaces(false));
  }
}



export function* watchFetchPlaces() {
  yield takeLatest(FETCH_PLACES, fetchPlaces);
}

export function* watchFetchHotels() {
  yield takeLatest(FETCH_HOTELS, fetchHotels);
}

export function* watchFetchRestaurants() {
  yield takeLatest(FETCH_RESTAURANTS, fetchRestaurants);
}
export function* watchFetchPlaceDetails() {
  yield takeLatest(FETCH_PLACE_DETAILS, fetchPlaceDetails);
}

export function* watchAppendFetchPlaces() {
  yield takeLatest(APPEND_FETCH_PLACES, appendFetchPlaces);
}

export function* watchAppendFetchHotels() {
  yield takeLatest(APPEND_FETCH_HOTELS, appendFetchHotels);
}

export function* watchAppendFetchRestaurants() {
  yield takeLatest(APPEND_FETCH_RESTAURANTS, appendFetchRestaurants);
}



//  root 

export function* rootSaga() {
  yield all([
    watchFetchPlaces(),
    watchFetchHotels(),
    watchFetchRestaurants(),
    watchFetchPlaceDetails(),
    watchAppendFetchPlaces(),
    watchAppendFetchHotels(),
    watchAppendFetchRestaurants(),
  ]);
}