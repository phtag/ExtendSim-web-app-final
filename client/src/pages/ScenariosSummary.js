import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ScenariosSummary extends React.Component {
  state = {
  };
  handleTableRowResultsClick_old = (handleShowTableRowResults, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('id');
    handleShowTableRowResults(event, scenarioID, history);
  }

  handleTableRowResultsClick = (handleScenarioSummarySelection, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('id');

    handleScenarioSummarySelection(event, scenarioID, history);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderUserScenariosTableData,
            renderUserScenarioResultsTableData,
            handleScenarioSummarySelection
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
                        <th className="table-headers">Scenario ID</th>
                        <th className="table-headers">User Login Session ID</th>
                        <th className="table-headers">Username</th>
                        <th className="table-headers">Scenario Submission Date/Time</th>
                        <th className="table-headers">Scenario Completion Date/Time</th>
                        <th className="table-headers">Results</th>
                        <th className="table-headers">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderUserScenariosTableData((event) => 
                        this.handleTableRowResultsClick(handleScenarioSummarySelection, event))}
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
