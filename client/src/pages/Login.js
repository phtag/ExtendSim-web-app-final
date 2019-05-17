import React, { Component } from 'react';

import API from '../utils/API';
  function Login(props) {
    return (
      <div id="home">
        <div className="container">
            <div className="row">
                <header id="ExtendSim-header">
                </header>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <h2>ExtendSim Web Simulation Login</h2>
                    <form className="clearfix mb-4" action="POST">
                        <div className="form-group">
                            <label htmlFor="example-text">Username</label>
                            <input onChange={props.handleOnChangeEvents('username')} type="text" id="username-text" className="form-control" aria-describedby="example-text" placeholder="Enter username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-text">Password</label>
                            <input onChange={props.handleOnChangeEvents('password')} type="password" id="password-text" className="form-control" aria-describedby="password-text"></input>
                        </div>
                        <button 
                            onClick={props.handleLoginOnSubmitEvent}
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

export default Login;
