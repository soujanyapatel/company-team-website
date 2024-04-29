import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import AllRoutes from './AllRoutes';
import './App.css';

function App() {
  return (
    <div>
      {/* <Navbar/> */}
      <AllRoutes/>
    </div>
  );
}

export default App;
