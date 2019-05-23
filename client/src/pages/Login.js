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

  handleChange = (event, key, onChangeFunction) => {
    const { name, value } = event.target;
    onChangeFunction(key, value);
  }

  handleLogin = (event, onSubmitLoginFunction) => {
      alert('Handle submit');
    const { history } = this.props;
    const { username, password } = this.state;
    onSubmitLoginFunction(event);
    // API.login({ username, password })
    //   .then(res => {
    //     onLogin(res.data);
    //     history.push('/')
    //   })
    //   .catch(err => {
    //     this.setState({ error: err.response.data.error })
    //   });
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <UserContext.Consumer>
        {({handleUserInputChange, handleLoginSubmit, username, password, validationObjects}) => (
        //   <div>
        //     <h1>Login</h1>
        //     <label htmlFor="name">Username</label>
        //     <input
        //       autoComplete="off"
        //       type="text"
        //       name="username"
        //       value={username}
        //       onChange={(e) => this.handleChange(e, 'username', handleUserInputChange)}
        //     />
        //     <label htmlFor="password">Password</label>
        //     <input
        //       type="password"
        //       name="password"
        //       value={password}
        //       onChange={(e) => this.handleChange(e, 'password', handleUserInputChange)}
        //     />

        //     <button onClick={() => this.handleLogin(handleLoginSubmit)}>Sign up</button>
        //     <br />
        //     { error && (
        //       <div className="alert">
        //         {error}
        //       </div>
        //     )}
        //     <pre>{JSON.stringify(this.state, null, 2)}</pre>
        //   </div>
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
                            <label htmlFor="username-text">Username</label>
                            <input 
                                onChange={(e) => this.handleChange(e, 'username', handleUserInputChange)}
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
