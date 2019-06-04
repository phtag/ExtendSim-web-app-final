import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext';
import ResourceBarChart from '../utils/ResourceBarChart'; 

class ResourceResults extends React.Component {
  state = {
  };
  constructor(props) {
    super(props);
    this.resourceChart = React.createRef(); // Create a ref    
    this.resourceTable = React.createRef(); // Create a ref    
  }

  handleButtonClick = (event, myRef) => {
    myRef.current.scrollIntoView();
    if (myRef.current.id === "home") {
      this.setState(
        {
          displayShowChartButton: true,
          displayShowTableButton: false
        });
    } else {
      this.setState(
        {
          displayShowChartButton: false,
          displayShowTableButton: true
        });
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
            resourceChartData,
            renderResourcesTableData,
            scenarioID,
            scenarioName
        }) => (
          <div id="home" ref={this.resourceTable}>>
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Resource Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                  {this.state.displayShowChartButton ? 
                  (
                    <div>
                      <button class="resource-results-button" onClick={(event) => this.handleButtonClick(event, this.resourceChart)}>
                        View chart
                      </button>
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
                    <div id="show-chart" ref={this.resourceChart}>
                    </div>
                    </div>
                  ) : (
                    <div id="show-chart" ref={this.resourceChart}>
                       <button class="resources-results-button" onClick={(event) => this.handleButtonClick(event, this.resourceTable)}>
                          View table data
                        </button>                   
                      <ResourceBarChart resourceChartData={resourceChartData}></ResourceBarChart>
                    </div> )}

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
