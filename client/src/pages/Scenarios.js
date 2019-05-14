import React, { Component } from 'react';

import API from '../utils/API';
// // import { Link } from 'react-router-dom';
// import RandomHomeComponent from '../components/RandomHomeComponent';

class Scenarios extends Component {
  state = {
    email: '',
    password: '',
    userLoginID: ''
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
  <div className="container my-scenario-container">
    <div className="row">
      <header id="ExtendSim-header">
      </header>
    </div>
    <div className="row">
      <div className="col-8">
        <h2>ExtendSim Web Simulation Scenario Inputs</h2>
        <form className="clearfix mb-4" action="POST">
          <div className="form-group">
            <label htmlFor="scenario-name-text" className="scenario-input-labels" oninput="validateScenarioInputs()">Scenario name:</label>
            <input type="text" id="scenario-name-text" className="form-control" aria-describedby="scenario-name-text" placeholder="Enter scenario name"></input>
          </div>          
          <button id="submit-simulation-scenario" className="btn btn-primary float-left">Submit simulation scenario</button>
       </form>
        <h3>Scenario Information:</h3>
        <label htmlFor="user-login-id" className="scenario-input-labels">User Login ID:</label>
        <output name="userLoginID" id="user-login-id">{this.userLoginID}</output>
        <br></br>
        <label htmlFor="scenario-id" className="scenario-input-labels">Scenario ID:</label>
        <output name="scenario_id" id="scenario-id"></output>
        <br></br>
        <label htmlFor="scenario-folder-pathname" className="scenario-input-labels">Scenario folder path:</label>
        <output name="scenario_folder_path" id="scenario-folder-pathname"></output>
        <br></br>
        <label htmlFor="scenario-run-status" className="scenario-input-labels">Scenario run status:</label>
        <output name="scenarioRunStatus" id="scenario-run-status"></output>
        <button id="show-scenario-results" className="btn btn-primary float-right">Show scenario results</button>
        <br></br>
        <label for="scenario-input-files-list" className="scenario-input-labels">Selected Scenario Input Files:</label>
        <output id="scenario-input-files-list"></output>
        <br></br>
        <label htmlFor="drop-area" className="scenario-input-labels">Scenario Input Files Drop Zone:</label>
        <div id="drop-area">
        </div>
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
