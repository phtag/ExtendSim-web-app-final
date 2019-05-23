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

  handleLogin = (text, onLogin) => {
      alert('Handle submit');
    const { history } = this.props;
    const { username, password } = this.state;
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
          <div>
            <h1>Login</h1>
            <label htmlFor="name">Username</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              value={username}
              onChange={(e) => this.handleChange(e, 'username', handleUserInputChange)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => this.handleChange(e, 'password', handleUserInputChange)}
            />

            <button onClick={() => this.handleLogin(handleLoginSubmit)}>Sign up</button>
            <br />
            { error && (
              <div className="alert">
                {error}
              </div>
            )}
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Login;
