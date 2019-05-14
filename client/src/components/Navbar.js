import React, { useContext } from 'react';
import { CounterContext } from '../context';
import { Link } from 'react-router-dom';
import "./style.css";

const Navbar = () => {
  const { currentUser } = useContext(CounterContext);
  return (
    <div>
      <Link className="navbar-menu-items" to="/login">Login</Link>
      <Link className="navbar-menu-items" to="/scenarios">Scenarios</Link>
      <Link className="navbar-menu-items" to="/results">Results</Link>
    </div>
  );
};

export default Navbar;
