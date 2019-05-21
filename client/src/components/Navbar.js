import React, { useContext } from 'react';
import { CounterContext } from '../context';
import {withRouter} from "react-router-dom";    // NOTE: This must be done to enable this component to pass history to button click event handler
import { Link } from 'react-router-dom';
import "../assets/css/style.css";

const Navbar = (props) => {
  const { currentUser } = useContext(CounterContext);
  if (!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="Scenario-navbar-option")].enabled) {
    return (
      <div>
        <Link 
          className="navbar-menu-items" 
          to="/">
          Home
        </Link>
        <Link className="navbar-menu-items" to="/signup">Signup</Link>
        <Link className="navbar-menu-items" to="/login">Login</Link>
      </div>
    )     
  }
  else {
    if (!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="Results-navbar-option")].enabled) {
      return (
        <div>
          <Link 
            className="navbar-menu-items" 
            to="/">
            Home
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/signup">
            Signup
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/login">
            Login
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/scenarios">
            Scenarios
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link 
            className="navbar-menu-items" 
            to="/">
            Home
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/signup">
            Signup
          </Link>
          <Link           
            className="navbar-menu-items" 
            to="/login">
            Login
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/scenarios">
            Scenarios
          </Link>
          <Link 
            className="navbar-menu-items" 
            to="/results">
            Results
          </Link>
        </div>
      );
    }
  };
};

export default withRouter(Navbar);
