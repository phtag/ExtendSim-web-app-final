import React from 'react';
import API from '../utils/API';
import BasicDropArea from '../components/BasicDropArea';
import UserContext from '../utils/UserContext'; 

class Scenarios extends React.Component {
  state = {
  };

  handleChange = (event, key, onChangeFunction, validationObjects) => {
    const { name, value } = event.target;
    onChangeFunction(key, value);
  }

  handleScenarioSubmissionClick = (event, onSubmitScenarioClickFunction) => {
    const { history } = this.props;
    onSubmitScenarioClickFunction(event, history);
  }

  handleShowResultsClick = (event, onShowResultsClickFunction) => {
    const { history } = this.props;
    onShowResultsClickFunction(event, history);
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <UserContext.Consumer>
        {({handleUserInputChange, 
           handleDropEvents, 
           handleSubmitSimulationScenario, 
           handleShowResults,
           userLoginSessionID, 
           scenarioID, 
           scenarioRunStatus,
           validationObjects}) => (
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
                      <label htmlFor="scenario-name-text" className="scenario-input-labels">Scenario name:</label>
                      <input 
                        onChange={(e) => this.handleChange(e, 'scenarioName', handleUserInputChange, validationObjects)}
                        type="text" id="scenario-name-text" 
                        className="form-control" 
                        aria-describedby="scenario-name-text" 
                        placeholder="Enter scenario name">
                      </input>
                    </div>          
                    <button 
                      onClick={(e) => this.handleScenarioSubmissionClick(e, handleSubmitSimulationScenario)} 
                      disabled={!validationObjects[validationObjects.findIndex(obj => obj.name==="SubmitScenarioButton")].enabled}
                      id="submit-simulation-scenario" 
                      className="btn btn-primary float-left">Submit simulation scenario
                    </button>
                  </form>
                  <form className="clearfix mb-4" action="POST">
                    <h3>Scenario Information:</h3>
                    <label htmlFor="user-login-id" className="scenario-input-labels">User Login Session ID:</label>
                    <output name="userLoginID" className="scenario-inputs-output-fields" id="user-login-id">{userLoginSessionID}</output>
                    <br></br>
                    <label htmlFor="scenario-id" className="scenario-input-labels">Scenario ID:</label>
                    <output name="scenario_id" className="scenario-inputs-output-fields" id="scenario-id">{scenarioID}</output>
                    {/* <br></br>
                    <label htmlFor="scenario-folder-pathname" className="scenario-input-labels">Scenario folder path:</label>
                    <output name="scenario_folder_path" className="scenario-inputs-output-fields" id="scenario-folder-pathname">{scenarioFolderPathname} </output> */}
                    <br></br>
                    <label htmlFor="scenario-run-status" className="scenario-input-labels">Scenario run status:</label>
                    <output name="scenarioRunStatus" className="scenario-inputs-output-fields" id="scenario-run-status">{scenarioRunStatus}</output>
                    <button
                      onClick={(e) => this.handleShowResultsClick(e, handleShowResults)}
                      id="show-scenario-results"
                      className="btn btn-primary float-right"
                      disabled={!validationObjects[validationObjects.findIndex(obj => obj.name==="ShowResultsButton")].enabled}>
                      Show scenario results
                    </button>
                  </form>
                  <br></br>
                  <BasicDropArea handleDropEvents = {handleDropEvents}/>
                </div>
              </div>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Scenarios;
