import React from "react";
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import "../assets/css/style.css";

function Navbar() {
  return (
    <UserContext.Consumer>
      {({username}) => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            ExtendSim ASP Home
          </Link>
          {username ? (
            <div className="navbar-nav">
              <Link className="nav-link" to="/scenarios">Scenario setup</Link>
              <Link className="nav-link" to="/scenarios-summary">Scenarios summary</Link>
            </div>
          ): (
            <div className="navbar-nav">
              <Link className="nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          )}
        </nav>
      )}
    </UserContext.Consumer>
  );
}


export default Navbar;
