// import React, { Component } from 'react';
// import { render } from 'react-dom'
import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

// import {withRouter} from "react-router-dom";    // NOTE: This must be done to enable this component to pass history to button click event handler
// import UserContext from '../utils/UserContext'; 
class Login extends React.Component {
    handleChange = (key, onChange) => {
        onChange(key);
    }
    handleSubmit = (onSubmit) => {
        const { history } = this.props;
        history.push('/scenarios');
        onSubmit();
    }

    render() {
        alert("Login page");
        return (
            <UserContext.Consumer>
                {
                    ({onInputChange, onLoginSubmit, validationObjects }) => (
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
                                            <input onChange={this.handleChange('username', onInputChange)} type="text" id="username-text" className="form-control" aria-describedby="example-text" placeholder="Enter username"></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password-text">Password</label>
                                            <input onChange={this.handleChange('password', onInputChange)} type="password" id="password-text" className="form-control" aria-describedby="password-text"></input>
                                        </div>
                                        <button 
                                            onClick={this.handleSubmit(onLoginSubmit)} // Must pass router history to parent so that it can redirect to another page
                                            disabled={!validationObjects[validationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled}
                                            id="submit-login-info" className="btn btn-primary float-left">Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )};
            </UserContext.Consumer>
        );
    }
}

export default Login;
