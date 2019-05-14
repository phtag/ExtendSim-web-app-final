import React, { Component } from 'react';

import API from '../utils/API';
// // import { Link } from 'react-router-dom';
// import RandomHomeComponent from '../components/RandomHomeComponent';

class Scenarios extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    const token = localStorage.getItem('current_user_token');

    if (token) {
      API.validateToken(token)
        .then(() => this.props.history.push('/'))
        .catch(() => localStorage.removeItem('current_user_token'));
    }
  }

  onSubmit = () => {
    API.login(this.state)
      .then(res => localStorage.setItem('current_user_token', res.data.token))
      .catch(err => console.log(err));
  };

  onChange = key => e => this.setState({ [key]: e.target.value });

  render() {
    return (
      <div id="home">
    <div className="container">
        <div className="row">
            <header id="ExtendSim-header">
            </header>
        </div>
        <div className="row">
            <div className="col-8 offset-2">
                <h2>ExtendSim Web Simulation Scenario Results</h2>
                <form className="clearfix mb-4" action="POST">
                    <div className="form-group">
                        <label htmlFor="example-text">Username</label>
                        <input type="text" id="username-text" className="form-control" aria-describedby="example-text" placeholder="Enter username"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-text">Password</label>
                        <input type="password" id="password-text" className="form-control" aria-describedby="password-text"></input>
                    </div>
                    <button id="submit-login-info" className="btn btn-primary float-left">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
      // <div>
      //   <h1>Login</h1>
      //   <input
      //     type="text"
      //     value={this.state.email}
      //     label="email"
      //     onChange={this.onChange('email')}
      //   />
      //   <input
      //     type="password"
      //     value={this.state.password}
      //     label="password"
      //     onChange={this.onChange('password')}
      //   />
      //   <button
      //     onClick={this.onSubmit}
      //     disabled={!Boolean(this.state.email && this.state.password)}
      //   >
      //     Login
      //   </button>
      // </div>
    );
  }
}

export default Scenarios;
