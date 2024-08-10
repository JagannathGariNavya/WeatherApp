import React from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';

const Main = ({ onSearch, weatherData, onAddFavorite, onRemoveFavorite, favorites, onToggleUnit, unit }) => {
  return (
    <div className="main-content">
      <Search onSearch={onSearch} />
      <div className="weather-favorites-container">
        <div className="weather-card">
          <WeatherDisplay
            weatherData={weatherData}
            onAddFavorite={onAddFavorite}
            unit={unit}
          />
        </div>
        <Favorites onRemoveFavorite={onRemoveFavorite} />
      </div>
    </div>
  );
};

export default Main;
