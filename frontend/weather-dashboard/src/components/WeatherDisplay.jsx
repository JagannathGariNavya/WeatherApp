import React from 'react';
import '../components/App.css'; // Ensure the path is correct

const WeatherDisplay = ({ weatherData, onAddFavorite, unit }) => {
  if (!weatherData) return <div className="current-weather">Loading...</div>;

  const { main, weather, dt, city } = weatherData;
  const date = new Date(dt * 1000).toLocaleDateString();

  return (
    <div className="current-weather">
      <h2>{city}</h2>
      <p>{date}</p>
      <p>Temperature: {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Condition: {weather[0].main}</p>
      <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description} />
      <button onClick={() => onAddFavorite(city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
