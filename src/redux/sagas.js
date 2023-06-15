import { put, takeLatest, call, all } from 'redux-saga/effects';
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


export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_HOTELS = 'FETCH_HOTELS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';

function* fetchPlaces(action) {
  yield put(setFetchingPlaces(true));
  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);
  try {
    const response = yield call(axios.get, `http://localhost:5000/api/place/attractions?query=${action.payload}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`);
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
  } finally {
    yield put(setFetchingPlaces(false));
  }
}

function* fetchHotels(action) {
  yield put(setFetchingPlaces(true));
  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);

  try {
    const response = yield call(axios.get, `http://localhost:5000/api/place/hotels?query=${action.payload}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`);
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
  } finally {
    yield put(setFetchingPlaces(false));
  }
}

function* fetchRestaurants(action) {
  yield put(setFetchingPlaces(true));
  yield all([
    put(clearPlaces()),
    put(clearHotels()),
    put(clearRestaurants()),
  ]);

  try {
    const response = yield call(axios.get, `http://localhost:5000/api/place/restaurants?query=${action.payload}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`);
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


//  root 

export function* rootSaga() {
  yield all([
    watchFetchPlaces(),
    watchFetchHotels(),
    watchFetchRestaurants()
  ]);
}