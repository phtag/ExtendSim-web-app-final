import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Signup extends React.Component {  
    state = {
        username: "",
        password: "",
        reenteredpassword: "",
        activationkey: "",
        error: "",
        validInputs: false
    }
      
    componentDidMount () {
    };

    handleChange = (event, onChangeFunction) => {
        const { name, value } = event.target;
        onChangeFunction(name, value, 'signup');
    }
    
    handleSignup = (event, onSubmitSignupFunction) => {
        event.preventDefault();
        const { history } = this.props;
        onSubmitSignupFunction(event, history);
    }
    render() {
        return (
            <UserContext.Consumer>
            {({
              handleUserInputChange, 
              handleSignupSubmit, 
              username, 
              password, 
              reenteredpassword,
              activationkey,
              errorSignupPage,
              validationObjects
            }) => (
                <div id="home">
                    <div className="container">
                        <div className="row">
                            <header id="ExtendSim-header">
                            </header>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <h2>ExtendSim ASP signup page</h2>
                                <form className="clearfix mb-4" action="POST">
                                    <div className="form-group">
                                        <label htmlFor="username-text">Username</label>
                                        <input 
                                            onChange={(e) => this.handleChange(e, handleUserInputChange)}
                                            type="text" 
                                            id="username-text" 
                                            name="username"
                                            value={username}
                                            className="form-control input-text" 
                                            aria-describedby="example-text" 
                                            placeholder="Enter username">
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password-text">Password</label>
                                        <input 
                                            onChange={(e) => this.handleChange(e, handleUserInputChange)}
                                            type="password" 
                                            value={password}
                                            id="password-text" 
                                            name="password"
                                            className="form-control input-text" 
                                            aria-describedby="password-text">
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="repeat-password-text">Re-enter password</label>
                                        <input 
                                            onChange={(e) => this.handleChange(e, handleUserInputChange)}
                                            type="password"
                                            value={reenteredpassword} 
                                            id="repeat-password-text" 
                                            name="reenteredpassword"
                                            className="form-control input-text" 
                                            aria-describedby="password-text">
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="activationkey-text">Activation key</label>
                                        <input 
                                            onChange={(e) => this.handleChange(e, handleUserInputChange)}
                                            type="text" 
                                            id="activationkey-text" 
                                            name="activationkey"
                                            value={activationkey}
                                            className="form-control input-text" 
                                            aria-describedby="example-text" 
                                            placeholder="Enter username">
                                        </input>
                                    </div>
                                    <button 
                                        onClick={(e) => this.handleSignup(e, handleSignupSubmit)}
                                        disabled={!validationObjects[validationObjects.findIndex(obj => obj.name==="signupSubmitButton")].enabled}
                                        id="submit-signup-info" 
                                        className="btn btn-primary float-left">
                                        Submit
                                    </button>
                                    <br></br>
                                    { errorSignupPage && (
                                    <div className="login-errors">
                                        <h3>{errorSignupPage}</h3>
                                    </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </UserContext.Consumer>
          );
    }
    }
export default Signup;
