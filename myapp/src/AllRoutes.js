import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import GetDetails from './GetDetails';
import LandingPage from './LandingPage';
function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/insert" element={<Form />} />
        <Route path="/search" element={<GetDetails />} />
      </Routes>
    </Router>
  );
}

export default AllRoutes;
