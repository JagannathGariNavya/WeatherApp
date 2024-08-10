import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import FiveDayForecast from './components/FiveDayForecast';
import './components/App.css'; // Ensure the path is correct

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric');
  const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastSearchedCity') || '');

  useEffect(() => {
    fetch('https://weatherapp-2-i7iw.onrender.com/favorites')
      .then((response) => response.json())
      .then((data) => setFavorites(data || []))
      .catch((error) => console.error('Error fetching favorites:', error));

    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  }, [lastSearchedCity]);

  const handleSearch = async (city) => {
    const apiKey = '5ab224be174208d5ebda0aa9f35a2f72'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData({ ...data.list[0], city }); // Include city name in weatherData
      setForecastData(data.list.slice(1, 6).map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp: item.main.temp,
        weather: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      })));
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData([]);
    }
  };

  const addFavorite = (city) => {
    fetch('https://weatherapp-2-i7iw.onrender.com/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city, id: Date.now() })
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites((prevFavorites) => [...prevFavorites, data]);
      })
      .catch((error) => console.error('Error adding favorite:', error));
  };

  const removeFavorite = (city) => {
    const favoriteToRemove = favorites.find(fav => fav.city === city);
    if (favoriteToRemove) {
      fetch(`https://weatherapp-2-i7iw.onrender.com/favorites/${favoriteToRemove.id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== favoriteToRemove.id));
        })
        .catch((error) => console.error('Error removing favorite:', error));
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <div className="App">
      <Main
        onSearch={handleSearch}
        weatherData={weatherData}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
        favorites={favorites}
        onToggleUnit={toggleUnit}
        unit={unit}
      />
      {lastSearchedCity && (
        <FiveDayForecast city={lastSearchedCity} unit={unit} />
      )}
    </div>
  );
};

export default App;
