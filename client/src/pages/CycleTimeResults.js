import React from 'react';import API from '../utils/API';
import UserContext from '../utils/UserContext'; 
import CycleTimeBarChart from '../utils/CycleTimeBarChart'; 

class CycleTimeResults extends React.Component {
  state = {
    displayShowChartButton: true,
    displayShowTableButton: false
  };

  constructor(props) {
    super(props);
    this.cycleTimeTable = React.createRef(); // Create a ref    
    this.cycleTimeChart = React.createRef(); // Create a ref    
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
            cycleTimeChartData,
            renderCycleTimeTableData,
            scenarioID,
            scenarioName
        }) => (
          <div id="home" ref={this.cycleTimeTable}>
            <div className="container my-scenario-container">
              <div className="row">
                <header id="ExtendSim-header">
                </header>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Cycle-Time Results for Scenario={scenarioName} (scenario ID={scenarioID})</h2>
                  {this.state.displayShowChartButton ? 
                  (
                    <div>
                    <button class="cycle-time-results-button" onClick={(event) => this.handleButtonClick(event, this.cycleTimeChart)}>
                      View chart
                    </button>
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
                    <div id="show-chart" ref={this.cycleTimeChart}>
                    </div>
                    </div>
                  ) : (
                    <div id="show-chart" ref={this.cycleTimeChart}>
                       <button class="cycle-time-results-button" onClick={(event) => this.handleButtonClick(event, this.cycleTimeTable)}>
                          View table data
                        </button>                   
                      <CycleTimeBarChart cycleTimeChartData={cycleTimeChartData}></CycleTimeBarChart>
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

export default CycleTimeResults;
