import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
	places: [],
	mapSettings: {
		center: { lat: 51.509865, lng: -0.118092 },
		zoom: 15,
	},
	lastSearchedCity: null,
	lastSearchedCoordinates: null,
	hotels: [],
	restaurants: [],
	selectedPlace: null,
	selectedPlacePosition: null,
	isFetchingPlaces: false,
    isFetchingHotels: false,
    isFetchingRestaurants: false,
    isFetchingAttractions: false,
	shouldBounce: false,
	selectedPinId: null,

};

const placesSlice = createSlice({
	name: 'placesDisplay',
	initialState,
	reducers: {
		setPlaces: (state, action) => {
			state.places = action.payload;
		},
		setMapSettings: (state, action) => {
			state.mapSettings = action.payload;
		},
		setLastSearchedCity: (state, action) => {
			state.lastSearchedCity = action.payload;
		},
		setLastSearchedCoordinates: (state, action) => {
			state.lastSearchedCoordinates = action.payload;
		},
		setHotels: (state, action) => {
			state.hotels = action.payload;
		},
		setRestaurants: (state, action) => {
			state.restaurants = action.payload;
		},
		setSelectedPlace: (state, action) => {
			state.selectedPlace = action.payload;
		},
		
		setSelectedPlacePosition: (state, action) => {
			state.selectedPlacePosition = action.payload;
		},
		
		setFetchingPlaces: (state, action) => {
      state.isFetchingPlaces = action.payload;
    },
		setFetchingHotels: (state, action) => {
      state.isFetchingHotels = action.payload;
    },
    setFetchingRestaurants: (state, action) => {
      state.isFetchingRestaurants = action.payload;
    },
    setFetchingAttractions: (state, action) => {
      state.isFetchingAttractions = action.payload;
    },
		clearPlaces: (state) => {
      state.places = [];
    },
		clearHotels: (state) => {
      state.hotels = [];
    },
		clearRestaurants: (state) => {
      state.restaurants = [];
    },
		setShouldBounce: (state, action) => {
      state.shouldBounce = action.payload;
    },
    resetShouldBounce: state => {
      state.shouldBounce = false;
    },
		setSelectedPinId: (state, action) => {
      state.selectedPinId = action.payload;
    },
	
	},
});

export const {
	setPlaces,
	setMapSettings,
	setLastSearchedCity,
	setLastSearchedCoordinates,
	setHotels,
	setRestaurants,
	setSelectedPlace,
	setSelectedPlacePosition,
	setFetchingPlaces,
	isFetchingPlaces,
	clearPlaces,
	clearRestaurants,
	clearHotels,
	setShouldBounce,
  resetShouldBounce,
	setSelectedPinId,
	setFetchingAttractions,
	setFetchingHotels,
	setFetchingRestaurants,

} = placesSlice.actions;

export default placesSlice.reducer;
