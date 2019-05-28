import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ScenariosSummary extends React.Component {
  state = {
  };
  handleTableRowResultsClick = (handleShowTableRowResults, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('id');
    alert("scenarioID=" + scenarioID);
    handleShowTableRowResults(event, scenarioID, history);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderUserScenariosTableData,
            handleShowTableRowResults
        }) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row no-gutters">
                <div className="col-8">
                  <h2>Scenarios Summary</h2>
                  <table id='user-scenarios' border="1">
                  <thead>
                    <tr>
                        <th>scenarioID</th>
                        <th>username</th>
                        <th>scenarioFolderPathname</th>
                        <th>scenarioSubmissionDateTime</th>
                        <th>scenarioCompletionDateTime</th>
                        <th>Results</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderUserScenariosTableData((event) => 
                        this.handleTableRowResultsClick(handleShowTableRowResults, event))}
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

export default ScenariosSummary;
