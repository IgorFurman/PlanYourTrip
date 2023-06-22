# 🗺️ Plan Your Trip 

Plan Your Trip is a comprehensive application for travel planning, developed with React. The application interacts with a custom backend to fetch data due to CORS restrictions and secure handling. 

🔗 Live Application: [https://igorfurman.github.io/PlanYourTrip/](https://igorfurman.github.io/PlanYourTrip/)

🔗 Backend Repository: [https://github.com/IgorFurman/plan-your-trip-backend.git](https://github.com/IgorFurman/plan-your-trip-backend.git)

---

## 🎯 Functionality

- Display of attractions, hotels, and restaurants based on city search.
- Ability to add places to a personal list.
- Download the list as a text file.
- Displays real-time weather updates.

---

## 🧩 Components

- `App`: Main component rendering other components and managing scroll states and window resize events.
- `AttractionsList`, `HotelsList`, `RestaurantsList`: Components for displaying respective listings.
- `MapContainer`: Handles the display of Google Map and rendering markers for attractions, hotels, and restaurants.
- `MapLegend`: Renders a legend for different place types displayed on the map.
- `PlaceDetails`: Displays detailed information about a selected place.
- `PlacesToVisitList`: Displays a list of places user added to their 'places to visit' list.
- `SearchBar`: Component for searching a city and initiating the search.
- `Spinner`: Displays a loading spinner animation.

---

## 🪝 Hooks and Contexts

- `MapContext` and `MapRefProvider`: Used to create and manage a context for a Map object.
- `ScrollProvider`: Provides scroll functionality to child components.
- `useMapScroll`: A custom hook to handle scrolling and place selection on the map.

---

## 🗃️ Redux State Management

- `placesToVisit`: Manages the state of places added to the user's visit list.
- `placesDisplay`: Manages the state of places displayed on the map and related settings.
- `scroll`: Manages the state related to scrolling behaviour of the page.
- `search`: Manages the state of the search bar.

### 🔄 Redux Saga

- `Saga` is used in the application to manage side effects. The main sagas include fetching places, hotels, and restaurants based on the city search. It also includes sagas to append to the lists without clearing other lists. Sagas are used to handle the asynchronous actions of fetching data from the backend API, making the application more robust and manageable.


---

## 🚀 Installation and Usage


```bash
git clone https://github.com/IgorFurman/PlanYourTrip.git
cd PlanYourTrip
npm install
npm start
```

**If you want to use it please remeber to create .env file and and pase your own API request link and of course have npm installed**
