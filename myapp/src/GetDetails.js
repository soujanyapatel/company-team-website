import React, { useState } from 'react';
import axios from 'axios';
import './GetDetails.css';

const GetDetails = () => {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios.post('http://localhost:9999/search', { name })
      .then(response => {
        const { success, message, employee } = response.data;
        if (success) {
          setSearchResult(employee);
          setError('');
        } else {
          setSearchResult(null);
          setError(message);
        }
      })
      .catch(error => {
        console.error('Error searching employee:', error);
        setError('An error occurred while searching for the employee');
      });
  };

  return (
    <div className="get-details-container">
      <label htmlFor="searchInput">Search for Employee:</label>
      <div className="search-input-container">
        <input
          type="text"
          id="searchInput"
          value={name}
          onChange={e => setName(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {searchResult && (
        <div className="employee-details">
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Role:</strong> {searchResult.role}</p>
          <p><strong>Thoughts:</strong> {searchResult.thoughts}</p>
          {searchResult.image && ( 
            <img 
              src={`http://localhost:9999/${searchResult.image}`} 
              alt="Employee" 
              className="employee-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GetDetails;
