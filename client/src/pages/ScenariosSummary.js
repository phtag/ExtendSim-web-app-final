import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ScenariosSummary extends React.Component {
  state = {
  };
  handleTableRowResults = (userLoginSessionID, 
                           scenarioFolderPathname, 
                           cycleTimeResultsFilename,
                           cycleTimeData,
                           event) => {
    event.preventDefault();
    alert('userLoginSessionID=' + userLoginSessionID);
    const { history } = this.props;

    console.log('handleTableRowResults - event.target.id =' + event.target.getAttribute('id'));
    console.log('handleTableRowResults - this.props =' + this.props);
    API.getScenarioResults(scenarioFolderPathname + cycleTimeResultsFilename, userLoginSessionID)
    .then(res1 => {
        console.log('scenario results=' + res1.data);
        cycleTimeData = res1.data;
        history.push('/cycle-time-results');
    });
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderUserScenariosTableData,
            userLoginSessionID, 
            scenarioFolderPathname, 
            cycleTimeResultsFilename,
            cycleTimeData
        }) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
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
                        this.handleTableRowResults(userLoginSessionID, 
                                                   scenarioFolderPathname, 
                                                   cycleTimeResultsFilename,
                                                   cycleTimeData,
                                                   event))}
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
