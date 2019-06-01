import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ScenariosResults extends React.Component {
  state = {
  };
  handleShowResults = (handleShowScenarioResults, event) => {
    event.preventDefault();
    const { history } = this.props;
    const type = event.target.getAttribute('id');
    handleShowScenarioResults(event, type, history);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            scenarioName,
            scenarioID,
            renderUserScenarioResultsTableData,
            handleShowScenarioResults
        }) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row no-gutters">
                <div className="col-8">
                    <h2>Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                    <table id='user-scenarios' border="1">
                        <thead>
                            <tr>
                                <th className="table-headers">Results Type</th>
                                <th className="table-headers">Results</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderUserScenarioResultsTableData((event) => 
                            this.handleShowResults(handleShowScenarioResults, event))}
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

export default ScenariosResults;
