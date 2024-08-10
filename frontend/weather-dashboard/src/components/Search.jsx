import React, { useState } from 'react';
import searchIcon from '../assets/search.png'; // Adjust path if necessary

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>
        {/* <img src={searchIcon} alt="Search" /> */}
        {/* <button>Search</button> */}
        Search
      </button>
    </div>
  );
};

export default Search;
