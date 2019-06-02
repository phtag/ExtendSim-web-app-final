import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class ResourceResults extends React.Component {
  state = {
  };

  render() {
    return (
      <UserContext.Consumer>
        {({
            renderResourcesTableData,
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
                  <h2>Resource Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                  <table id='user-scenarios' border="1">
                    <thead>
                        <tr>
                            <th className="table-headers">Resource ID</th>
                            <th className="table-headers">Pool</th>
                            <th className="table-headers">Total Orders Serviced</th>
                            <th className="table-headers">Total Idle Time</th>
                            <th className="table-headers">Total Busy Time</th>
                            <th className="table-headers">Total Busy Off-Shift Time</th>
                            <th className="table-headers">Total Down Time</th>
                            <th className="table-headers">Total Off-Shift Time</th>
                            <th className="table-headers">Total Failed Time</th>
                            <th className="table-headers">Total Schedule Down Time</th>
                            <th className="table-headers">Total Unschedule Down Time</th>
                            <th className="table-headers">Total Quantity Allocated Time</th>
                            <th className="table-headers">Quantity Utilization</th>
                            <th className="table-headers">Utilization</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderResourcesTableData()}
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

export default ResourceResults;
