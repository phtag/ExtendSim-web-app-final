import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Results extends React.Component {
  state = {
  };


  render() {
    const { username, password, error } = this.state;
    return (
      <UserContext.Consumer>
        {({handleUserInputChange, handleDropEvents, handleSubmitSimulationScenario, handleShowResults, userLoginSessionID, scenarioFolderPathname, validationObjects}) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-8">
                  <h2>ExtendSim Web Simulation Scenario Results</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Results;
