import React, { Component } from 'react';
import {withRouter} from "react-router-dom";    // NOTE: This must be done to enable this component to pass history to button click event handler
import API from '../utils/API';
  function Signup(props) {
    return (
      <div id="home">
        <div className="container">
            <div className="row">
                <header id="ExtendSim-header">
                </header>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <h2>ExtendSim ASP signup page</h2>
                    <form className="clearfix mb-4" action="POST">
                        <div className="form-group">
                            <label htmlFor="example-text">Username</label>
                            <input onChange={props.handleOnChangeEvents('username')} type="text" id="username-text" className="form-control" aria-describedby="example-text" placeholder="Enter username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-text">Password</label>
                            <input onChange={props.handleOnChangeEvents('signup-password')} type="password" id="password-text" className="form-control" aria-describedby="password-text"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeat-password-text">Re-enter password</label>
                            <input onChange={props.handleOnChangeEvents('signup-repeat-password')} type="password" id="repeat-password-text" className="form-control" aria-describedby="password-text"></input>
                        </div>
                        <button 
                            onClick={props.handleLoginOnSubmitEvent(props.history)} // Must pass router history to parent so that it can redirect to another page
                            disabled={!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled}
                            id="submit-login-info" className="btn btn-primary float-left">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
  }

export default withRouter(Signup);
