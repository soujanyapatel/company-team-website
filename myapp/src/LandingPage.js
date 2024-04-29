import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:9999/list')
      .then(response => {
        setEmployees(response.data.employees);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const insertClick = () => {
    navigate('/insert');
  };

  const searchClick = () => {
    navigate('/search');
  };

  return (
    <div className="landing-page-container">
      <h1>Landing Page</h1>
      <button className="action-button" onClick={insertClick}>Insert Your Details</button>
      <button className="action-button" onClick={searchClick}>Search Employee</button>

      <div>
        <h2>All Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              <span className="employee-name">Name: {employee.name}</span>, 
              <span className="employee-role"> Role: {employee.role}</span>, 
              <span className="employee-thoughts"> Thoughts: {employee.thoughts}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
