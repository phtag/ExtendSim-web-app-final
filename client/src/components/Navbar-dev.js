import React from "react";
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import "../assets/css/style.css";

function Navbar() {
  return (
    <UserContext.Consumer>
      {({username, pathname, validationObjects}) => (
        // <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky">
        <nav className="navbar navbar-dark bg-primary">
        <Link className="navbar-brand my-nav-link" to="/">
            ExtendSim ASP Home
          </Link>
          {validationObjects[validationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled ||
           validationObjects[validationObjects.findIndex(obj => obj.name==="signupSubmitButton")].enabled
            ? (
            <div className="navbar-nav">
              <div id="navbar-welcome">Welcome, {username}</div>
              <Link className="nav-link my-nav-link" to="/scenario-setup">Scenario setup</Link>
              <Link className="nav-link my-nav-link" to="/scenarios-summary">Scenarios summary</Link>
            </div>
          ): (
            <div className="navbar-nav">
              <Link className="nav-link my-nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link my-nav-link" to="/login">Login</Link>
            </div>
          )}
        </nav>
      )}
    </UserContext.Consumer>
  );
}


export default Navbar;
