import React, { Component } from 'react';
import BasicDropArea from '../components/BasicDropArea';
import {withRouter} from "react-router-dom";    // NOTE: This must be done to enable this component to pass history to button click event handler

// import API from '../utils/API';
function Scenarios (props) {
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
            <label htmlFor="scenario-name-text" className="scenario-input-labels">Scenario name:</label>
            <input onChange={props.handleOnChangeEvents('scenarioName')} type="text" id="scenario-name-text" className="form-control" aria-describedby="scenario-name-text" placeholder="Enter scenario name"></input>
          </div>          
          <button 
            onClick={props.handleSubmitSimulationScenarioBtnClick} 
            disabled={!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="SubmitScenarioButton")].enabled}
            id="submit-simulation-scenario" 
            className="btn btn-primary float-left">Submit simulation scenario
          </button>
       </form>
        <h3>Scenario Information:</h3>
        <label htmlFor="user-login-id" className="scenario-input-labels">User Login ID:</label>
        <output name="userLoginID" id="user-login-id">{props.state.userLoginSessionID}</output>
        <br></br>
        <label htmlFor="scenario-id" className="scenario-input-labels">Scenario ID:</label>
        <output name="scenario_id" id="scenario-id"></output>
        <br></br>
        <label htmlFor="scenario-folder-pathname" className="scenario-input-labels">Scenario folder path:</label>
        <output name="scenario_folder_path" id="scenario-folder-pathname">{props.state.scenarioFolderPathname} </output>
        <br></br>
        <label htmlFor="scenario-run-status" className="scenario-input-labels">Scenario run status:</label>
        <output name="scenarioRunStatus" id="scenario-run-status"></output>
        <button 
          id="show-scenario-results" 
          onClick={props.handleShowResultsButtonClick}
          className="btn btn-primary float-right"
          disabled={!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="ShowResultsButton")].enabled}>
          Show scenario results
        </button>
        <br></br>
        <label htmlFor="scenario-input-files-list" className="scenario-input-labels">Selected Scenario Input Files:</label>
        <output id="scenario-input-files-list"></output>
        <br></br>
        <label htmlFor="drop-area" className="scenario-input-labels">Scenario Input Files Drop Zone:</label>
        <BasicDropArea {...props}/>
      </div>
    </div>
  </div>
</div>
    );
  }
// }

export default Scenarios;
