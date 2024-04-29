import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const gotoHome = ()=>{
    navigate("/");
  }
  const gotoInsert = ()=>{
    navigate("/insert");
  }
  const gotoSearch = ()=>{
    navigate("/search");
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={gotoHome}>Home</button>
        </li>
        <li>
          <button onClick={gotoInsert}>Insert</button>
        </li>
        <li>
          <button onClick={gotoSearch}>Search</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
