import React from 'react';
import { Beforeunload } from 'react-beforeunload';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ScenariosSummary extends React.Component {
  state = {
  };

  myfunction = () => {
    alert('My function');
  }
  handleTableRowResultsClick_old = (handleShowTableRowResults, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('id');
    handleShowTableRowResults(event, scenarioID, history);
  }

  handleShowResultsClick = (ShowScenarioResults, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('name');
    ShowScenarioResults(event, scenarioID, history);
  }

  handleDeleteScenarioClick = (handleDeleteScenario, event) => {
    event.preventDefault();
    const { history } = this.props;
    const scenarioID = event.target.getAttribute('name');

    handleDeleteScenario(event, scenarioID, history);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderUserScenariosTableData,
            getUserScenarios,
            handleTableSelectionDeleteScenario,
            handleTableSelectionShowScenarioResults
        }) => (
          <div id="home">
            <Beforeunload onBeforeunload={this.myfunction} />
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row no-gutters">
                <div className="col-12">
                  <h2>Scenarios Summary</h2>
                  <table id='scenarios-summary-table' border="1">
                  <thead>
                    <tr>
                        <th className="table-headers">Scenario ID</th>
                        {/* <th className="table-headers">User Login Session ID</th> */}
                        <th className="table-headers">Scenario Name</th>
                        <th className="table-headers">Username</th>
                        <th className="table-headers">Scenario Submission Date/Time</th>
                        <th className="table-headers">Scenario Completion Date/Time</th>
                        <th className="table-headers">Results</th>
                        <th className="table-headers">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderUserScenariosTableData(
                        (event) => this.handleShowResultsClick(handleTableSelectionShowScenarioResults, event),
                        (event) => this.handleDeleteScenarioClick(handleTableSelectionDeleteScenario, event))}
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
