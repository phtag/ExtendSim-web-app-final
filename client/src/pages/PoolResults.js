import React from 'react';
import UserContext from '../utils/UserContext';
import PoolBarChart from '../utils/PoolBarChart'; 

class PoolResults extends React.Component {
  state = {
    displayShowChartButton: true,
    displayShowTableButton: false,
    chartType: "idle-busy",
    chartTitle: "Total Idle-Time/Total Busy-Time by Resource"
  };

  constructor(props) {
    super(props);
    this.poolChart = React.createRef(); // Create a ref    
    this.poolTable = React.createRef(); // Create a ref    
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
            poolChartData,
            renderPoolsTableData,
            scenarioID,
            scenarioName,
            handleChartTypeChange
        }) => (
          <div id="home" ref={this.poolTable}>
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Pool Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                  {this.state.displayShowChartButton ? 
                  (
                    <div>
                      <button class="resource-results-button" onClick={(event) => this.handleButtonClick(event, this.poolChart)}>
                        View chart
                      </button>
                    <table id='user-scenarios' border="1">
                      <thead>
                          <tr>
                              <th className="table-headers">Pool Name</th>
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
                        {renderPoolsTableData()}
                      </tbody>
                    </table>
                    <div id="show-chart" ref={this.poolChart}>
                    </div>
                    </div>
                  ) : (
                    <div id="show-chart" ref={this.poolChart}>
                       <button class="resource-results-button" onClick={(event) => this.handleButtonClick(event, this.poolTable)}>
                          View table data
                        </button>
                        <label htmlFor="pool-chart-type" class="drop-down-label">Chart Type:</label>
                        <select class="chart-type-drop-down" id="pool-chart-type" onChange={(event) => this.handleDropDownChange(event)}>
                          <option value="idle-busy">Idle/Busy Time</option>
                          <option value="utilization">Utilization</option>
                          <option value="total-orders-serviced">Total Orders Serviced</option>
                        </select>                             
                      <PoolBarChart chartType={this.state.chartType}></PoolBarChart>
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

export default PoolResults;
