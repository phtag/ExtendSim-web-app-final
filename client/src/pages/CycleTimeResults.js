import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 
import CycleTimeBarChart from '../utils/CycleTimeBarChart'; 
import CycleTimeBarChart2 from '../utils/CycleTimeBarChart-2'; 

class CycleTimeResults extends React.Component {
  state = {
  };

  render() {
    return (
      <UserContext.Consumer>
        {({
            cycleTimeChartData,
            renderCycleTimeTableData,
            scenarioID,
            scenarioName
        }) => (
          <div id="home">
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Cycle-Time Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                  <table id='user-scenarios' border="1">
                    <thead>
                        <tr>
                            <th className="table-headers">Step Name</th>
                            <th className="table-headers">Resource Requirement</th>
                            <th className="table-headers">Total Jobs Processed</th>
                            <th className="table-headers">Total Process Time</th>
                            <th className="table-headers">Total Wait Time</th>
                            <th className="table-headers">Avg. Process Time</th>
                            <th className="table-headers">Avg. Wait-Time</th>
                            <th className="table-headers">Avg. Cycle-Time</th>
                            <th className="table-headers">CoV Arrivals</th>
                            <th className="table-headers">CoV Departures</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderCycleTimeTableData()}
                    </tbody>
                  </table>
                  <div>
                    <CycleTimeBarChart2 cycleTimeChartData={cycleTimeChartData}></CycleTimeBarChart2>
                  </div>       
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
