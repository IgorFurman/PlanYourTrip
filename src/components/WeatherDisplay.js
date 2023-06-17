import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherContainer } from '../styles/styles.js';

import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, selectHasSearched, setHasSearched  } from '../redux/searchSlice';


import thunderstormIcon from '../images/weatherIcons/thunderstorm.png';
import drizzleIcon from '../images/weatherIcons/drizzle.png';
import rainIcon from '../images/weatherIcons/rain.png';
import iceIcon from '../images/weatherIcons/ice.png';
import fogIcon from '../images/weatherIcons/fog.png';
import sunIcon from '../images/weatherIcons/sun.png';
import cloudIcon from '../images/weatherIcons/cloud.png';
import unknownIcon from '../images/weatherIcons/unknown.png';

const WeatherDisplay = () => {
  const city = useSelector(selectSearch) || null;
  const [weatherData, setWeatherData] = useState(null);
  const hasSearched = useSelector(selectHasSearched);
  const dispatch = useDispatch();


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  useEffect(() => {
    

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data from OpenWeather API:', error);

        console.error('Error fetching weather data:', error);
      }
    };

    if (city && hasSearched) {
      fetchWeather();
      dispatch(setHasSearched(false))
    }
  }, [city, hasSearched]);

  const getWeatherIconUrl = (weatherId) => {
    if (weatherId >= 200 && weatherId <= 232) {
      return thunderstormIcon;
    } else if (weatherId >= 300 && weatherId < 400) {
      return drizzleIcon;
    } else if (weatherId >= 500 && weatherId < 600) {
      return rainIcon;
    } else if (weatherId >= 600 && weatherId < 700) {
      return iceIcon;
    } else if (weatherId >= 700 && weatherId < 800) {
      return fogIcon;
    } else if (weatherId === 800) {
      return sunIcon;
    } else if (weatherId >= 801 && weatherId < 900) {
      return cloudIcon;
    } else {
      return unknownIcon;
    }
  };

  if (!city) {
    return  <WeatherContainer> <h2>
      Wpisz miasto aby zobaczyć aktualną pogodę</h2> <img
          src={unknownIcon}
          alt="weather icons mix"
        /> </WeatherContainer>;
  }

  if (!weatherData) {
    return <WeatherContainer> <h2>
    Wpisz miasto aby zobaczyć aktualną pogodę</h2> <img
        src={unknownIcon}
        alt="weather icons mix"
      /> </WeatherContainer>;;
  }

  return (
    <WeatherContainer>
      <h2>{capitalizeFirstLetter(city)} pogoda:</h2>
      {weatherData.weather && weatherData.weather[0] && (
        <img
          src={getWeatherIconUrl(weatherData.weather[0].id)}
          alt="weather status"
        />
      )}
      <p><b>Temperatura: </b>{weatherData.main && Math.round(weatherData.main.temp)}°C</p>
      <p><b>Wilgotność: </b>{weatherData.main && weatherData.main.humidity}%</p>
      <p><b>Wiatr: </b>{weatherData.wind && weatherData.wind.speed} m/s</p>
      
    </WeatherContainer>
  );}

export default WeatherDisplay;
