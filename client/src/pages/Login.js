import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    currentUser: null
  }
  
  componentDidMount () {
  };

  handleChange = (event, key, onChangeFunction) => {
    const { name, value } = event.target;
    onChangeFunction(key, value);
  }

  handleLogin = (event, onSubmitLoginFunction) => {
    const { history } = this.props;
    const { username, password } = this.state;
    onSubmitLoginFunction(event, history);
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <UserContext.Consumer>
        {({handleUserInputChange, handleLoginSubmit, username, password, validationObjects}) => (
        <div id="home">
        <div className="container">
            <div className="row">
                <header id="ExtendSim-header">
                </header>
            </div>
            <div className="row">
                <div className="col-8">
                    <h2>ExtendSim ASP Login Page</h2>
                    <form className="clearfix mb-4" action="POST">
                        <div className="form-group">
                            <label htmlFor="username-text">Username</label>
                            <input 
                                onChange={(e) => this.handleChange(e, 'username', handleUserInputChange)}
                                autoComplete="off"
                                type="text" 
                                id="username-text" 
                                className="form-control" 
                                aria-describedby="username-text" 
                                placeholder="Enter username"
                                value={username}>
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-text">Password</label>
                            <input 
                                onChange={(e) => this.handleChange(e, 'password', handleUserInputChange)}
                                autoComplete="off"
                                type="password" 
                                id="password-text" 
                                className="form-control" 
                                aria-describedby="password-text"
                                value={password}>
                            </input>                            
                        </div>
                        <button 
                            onClick={(e) => this.handleLogin(e, handleLoginSubmit)}
                            disabled={!validationObjects[validationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled}
                            id="submit-login-info" className="btn btn-primary float-left">Submit
                        </button>
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

export default Login;
