import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class CycleTimeResults extends React.Component {
  state = {
  };

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderCycleTimeTableData,
            scenarioID, 
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
                  <h2>Cycle-Time Results for ScenarioID={scenarioID}</h2>
                  <table id='user-scenarios' border="1">
                    <thead>
                        <tr>
                            <th>stepname</th>
                            <th>resourceRequirement</th>
                            <th>totalJobsProcessed</th>
                            <th>totalProcessTime</th>
                            <th>totalWaitTime</th>
                            <th>avgProcessTime</th>
                            <th>avgWaitTime</th>
                            <th>avgCycleTime</th>
                            <th>CoVarrivals</th>
                            <th>CoVdepartures</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderCycleTimeTableData()}
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

export default CycleTimeResults;
