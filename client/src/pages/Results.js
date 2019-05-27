import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Results extends React.Component {
  state = {
  };


  render() {
    return (
      <UserContext.Consumer>
        {({handleUserInputChange, 
           handleDropEvents, 
           handleSubmitSimulationScenario, 
           handleShowResults,
           renderUserScenariosTableData,
           userLoginSessionID, 
           scenarioFolderPathname, 
           validationObjects}) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-8">
                  <h2>ExtendSim Web Simulation Scenario Results</h2>
                  <table id='user-scenarios' border="1">
                    <tr>
                      <th>scenarioID</th>
                      <th>username</th>
                      <th>scenarioFolderPathname</th>
                      <th>scenarioSubmissionDateTime</th>
                      <th>scenarioCompletionDateTime</th>
                      <th>Results</th>
                      <th>Delete</th>
                    </tr>
                    <tbody>
                        {renderUserScenariosTableData()}
                    </tbody>
                  </table>
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
