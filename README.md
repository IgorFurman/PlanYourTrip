# README - Product Sorting and Filtering in React

This project is an trip planning application made using React. The main functionality of the application is to provide an interface for displaying attractions, hotels, restaruatns for serached city. Because of the cors limitations and safety data from GOOGLE API is fetched from custom backend API. Backend for this app is here https://github.com/IgorFurman/plan-your-trip-backend.git. User may add those places to list and download it. Except that the app shows the current weather. Below is a brief summary of the structure and functionality of the application.

## Project Structure

The project is structured into several components, hooks and utility functions:

- **App**: The App component is the main component of the application. It is responsible for rendering other components, managing scroll-related state, and handling window resize events.

- **AttractionsList** component is responsible for displaying a list of tourist attractions. It receives data from the Redux store and handles user interactions such as adding attractions to a visit list or showing attractions on the map.

- **HotelsList** component is responsible for displaying a list of hotels. It receives data from the Redux store and handles user interactions such as adding hotels to a visit list or showing hotels on the map.

- **RestaurantsList** component is responsible for displaying a list of restaurants based on the user's search in a specific city. It includes the name, address, and rating of each restaurant. The component also provides options to show the restaurants on the map, add them to the "places to visit" list, and toggle the visibility of the list.

- **MapContainer** component is responsible for displaying the Google Map and rendering markers for different places such as attractions, hotels, and restaurants. It utilizes the Google Maps API and interacts with the Redux store to manage the map state and selected places.

- **MapLegend** component is responsible for rendering a legend that provides visual cues for the different types of places displayed on the map (attractions, hotels, and restaurants). It uses styled components to define the layout and styling of the legend items.

- **PlaceDetails** component is responsible for displaying detailed information about a selected place on the map. It includes the place's name, address, phone number, opening hours, website link, photos, rating, and reviews.

- **PlacesToVisitList** component is responsible for displaying a list of places that the user has added to their "places to visit" list. It includes the name, address, and rating of each place. The component also provides options to download the list as a text file and remove places from the list.

- **SearchBar** component is responsible for rendering a search bar at the top of the page. It allows users to enter a city name and select options to search for attractions, hotels, and restaurants. The component also includes a logo and a submit button to initiate the search.

- **Spinner** component is a reusable component that displays a loading spinner animation. It is used to indicate to the user that a process is in progress and that they should wait for the operation to complete.

## Utils and hooks

- **MapContext and MapRefProvider**: The MapContext and MapRefProvider are used to create and manage a context for a Map object. The context is created using React's createContext method and a React ref (mapRef) is used to hold the reference to the Map object

- **ScrollProvider**: The ScrollProvider is a utility component that provides scroll functionality to its child components.

- **The useMapScroll**: hook is a custom React hook designed to handle specific map interactions related to scrolling and place selection. It interacts with the Redux store by dispatching actions and leverages the Google Maps JavaScript API.

## Redux Data Management

The data in the application is managed using Redux, which acts as a centralized store for all the application state.

- **Slices of State** the state in Redux is divided into "slices", with each slice being managed by its own reducer. For this application, there are four slices of state: 'placesToVisit', 'placesDisplay', 'scroll', and 'search'.
'placesToVisit': Manages the state related to places marked to be visited by the user. Actions include adding and removing places from the list.

 - **placesToVisit**: Manages the state related to places marked to be visited by the user. Actions include adding and removing places from the list.

 - **placesDisplay**: Manages the state related to places being displayed. It includes information about places, map settings, fetching status of places, hotels, restaurants, and attractions. It also manages the state related to selected place and position, bouncing animation status and the ID of the selected pin.

 - **scroll**: Manages the state related to scrolling behaviour of the page, including the scroll status and the combined height of the search bar and title.

 - **search**: Manages the state related to search functionality, including the current search value and the status of whether a search has been performed.

- **Reducers and Actions**: Each slice of state has a corresponding Redux 'slice' created using Redux Toolkit's createSlice function, which automatically generates the reducer and actions based on the provided initialState and reducer functions.

- **Saga**: This collection of Redux Saga functions handles asynchronous actions and side effects related to fetching places data from the backend API and managing the application state. The functions include fetching places, hotels, restaurants, and place details. As well as appending additional places, hotels, and restaurants whose are used for fetching when city is searched and user don't need to clear other data. The corresponding watcher functions listen for specific actions and invoke the appropriate Redux Saga functions. The rootSaga function combines all the Redux Saga functions and runs them concurrently to initialize the Redux Saga middleware. Overall, these functions facilitate smooth data fetching and state management within the Redux architecture.

## How to Run

To run the project, you will need to have Node.js and npm installed. You can then clone the repository and install the dependencies using npm:

```bash
git clone <https://github.com/IgorFurman/PlanYourTrip.git-url>
cd <project-directory>
npm install
npm start
```
