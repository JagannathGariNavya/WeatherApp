import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FiveDayForecast = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState([]);
  const APIKey = '5ab224be174208d5ebda0aa9f35a2f72'; // Your API key here

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${APIKey}`;
        try {
          const response = await axios.get(apiUrl);
          const data = response.data.list;

          // Filter data to get 5-day forecast (one entry per day)
          const filteredData = data.reduce((acc, item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = {
                date: date,
                temp: item.main.temp,
                weather: item.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
              };
            }
            return acc;
          }, {});

          // Convert filteredData object to an array and limit to 5 days
          const forecastArray = Object.values(filteredData).slice(0, 5);
          setForecastData(forecastArray);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      };

      fetchForecast();
    }
  }, [city, unit]);

  return (
    <div className="five-day-forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastData.length > 0 ? (
          forecastData.map((day, index) => (
            <div className="forecast-card" key={index}>
              <h4>{day.date}</h4>
              <img src={day.icon} alt={day.weather} className="forecast-icon" />
              <p>{Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
              <p>{day.weather}</p>
            </div>
          ))
        ) : (
          <p>No forecast data available</p>
        )}
      </div>
    </div>
  );
};

export default FiveDayForecast;
