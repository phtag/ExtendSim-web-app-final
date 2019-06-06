import React from 'react';
import UserContext from '../utils/UserContext';
import ResourceBarChart from '../utils/ResourceBarChart'; 

class ResourceResults extends React.Component {
  static contextType = UserContext;

  state = {
    displayShowChartButton: true,
    displayShowTableButton: false,
    chartType: "idle-busy",
    chartTitle: "Total Idle-Time/Total Busy-Time by Resource"
  };

  constructor(props) {
    super(props);
    this.resourceChart = React.createRef(); // Create a ref    
    this.resourceTable = React.createRef(); // Create a ref    
  }

  handleDropDownChange = (event) => {
    this.setState({chartType: event.target.value});
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
            renderResourcesTableData,
            scenarioID,
            scenarioName
        }) => (
          <div id="home" ref={this.resourceTable}>
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
                       <button id={this.state.refreshPage} class="resource-results-button" onClick={(event) => this.handleButtonClick(event, this.resourceTable)}>
                          View table data
                        </button>  
                        <label htmlFor="resource-chart-type" class="drop-down-label">Chart Type:</label>
                        <select class="chart-type-drop-down" id="resource-chart-type" onChange={(event) => this.handleDropDownChange(event)}>
                          <option value="idle-busy">Idle/Busy Time</option>
                          <option value="utilization">Utilization</option>
                          <option value="total-orders-serviced">Total Orders Serviced</option>
                        </select>            
                      <ResourceBarChart chartType={this.state.chartType}></ResourceBarChart>
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
