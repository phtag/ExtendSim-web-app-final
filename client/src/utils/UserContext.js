import React from 'react';
import API from './API';
// import  { Chart } from 'react-chartjs-2';

const Context = React.createContext();
const initialState = { currentUser: {} };
const UserContext = React.createContext(initialState);
//const ExtendSimModelName = "/ASP example model (GS).mox";
// ExtendSim server (use this for Heroku)
// var ExtendSimModelPath =
//   "C:/Users/Administrator/Documents/ExtendSim10ASP_Prod/ASP/ASP Servers/ExtendSim Models" +
//   ExtendSimModelName;
const cycleTimeResultsFilename = "/Cycle Time Results.txt";

var checkModelStatusTimer;
const runInProcessScenarioStatus = 2;
const runCompletedScenarioStatus = 3;

export class UserProvider extends React.Component {
  state = {
    currentUser: null,
    username: "",
    password: "",
    reenteredpassword: "",
    activationkey: "",
    webpage: "",
    error: "",
    errorSignupPage: "",
    errorLoginPage: "",
    userLoginSessionID: "",
    scenarioRunStatus: "N/A",
    validationObjects: [
      {
        name: "signupSubmitButton",
        enabled: false
      },
      {
        name: "loginSubmitButton",
        enabled: false
      },
      {
        name: "SubmitScenarioButton",
        enabled: false
      },
      {
        name: "ShowResultsButton",
        enabled: false
      },
      {
        name: "Signup-navbar-option",
        enabled: true      
      },
      {
        name: "Login-navbar-option",
        enabled: true      
      },
      {
        name: "Scenario-navbar-option",
        enabled: false      
      },
      {
        name: "Results-navbar-option",
        enabled: false      
      }
    ],
    scenarioResultTypes: [
      {
        type: "Cycle-times",
        filename: "/Cycle Time Results.txt"
      },
      {
        type: "Resources",
        filename: "/Resources.txt"
      },
      {
        type: "Pools",
        filename: "/pools.txt"
      },
      {
        type: "Model",
        filename: "/Model Results.txt"
      }
    ],
    ExtendSimModels: [
      {
        name: "ASP example model (GS).mox",
        description: "ARM resource process model (deterministic)"
      },
      {
        name: "ASP final project-v1.mox",
        description: "ARM resource process model (stochastic)"
      }
    ],
    modelname: "",
    modelpath: "C:/Users/Administrator/Documents/ExtendSim10ASP_Prod/ASP/ASP Servers/ExtendSim Models",
    cycleTimeResultsFilename: "/Cycle Time Results.txt",
    scenarioName: "",
    scenarioID: -1,
    scenarioFolderPathname: "",
    scenarioInputFiles: [],
    userScenarios: [],
    cycleTimeData: [],
    resourceData: [],
    poolData: [],
    modelData: [],
    cycleTimeChartData: {
      totalJobsProcessed: [],
      totalProcessTime: [],
      totalWaitTime: [],
      avgProcessTime: [], 
      avgWaitTime: [],
      avgCycleTime: [],
      CoVarrivals: [],
      CoVdepartures: []
    },
    cycleTimeChartXAxisLabels: [],
    resourceChartData: [],
    resourceChartXAxisLabels: []
  }
  chartReference = {};
// Utilities

  getMatchingScenario = (scenarioID) => {
    console.log(this.state.userScenarios[0].scenarioID);
    for (var i=0;i<this.state.userScenarios.length;i++) {
      if (this.state.userScenarios[i].scenarioID == scenarioID) {
        return this.state.userScenarios[i];
      }
    }
    return null;
  }

  makeCycleTimeChartData = (cycleTimeData, dataType) => {
    const dataRow = [];
    cycleTimeData.map((rowData, key) => {
      const {
              stepname,
              totalJobsProcessed, 
              totalProcessTime, 
              totalWaitTime,
              avgProcessTime,
              avgWaitTime,
              avgCycleTime,
              CoVarrivals,
              CoVdepartures
            } = rowData; //destructuring
      var value;
  
      switch (dataType) {
        case 'totalJobsProcessed':
          value = totalJobsProcessed;
          break;

        case 'totalProcessTime':
          value = totalProcessTime;
          break;

        case 'totalWaitTime':
          value = totalWaitTime;
          break;

        case 'avgProcessTime':
          value = avgProcessTime;
          break;

        case 'avgWaitTime':
          value = avgWaitTime;
          break;

        case 'avgCycleTime':
          value = avgCycleTime;
          break;

        case 'CoVarrivals':
          value = CoVarrivals;
          break;
        
        case 'CoVdepartures':
          value = CoVdepartures;
          break;               
        }
        dataRow.push({"value": value, "label": stepname });
        // dataRow.push({"y": value, "x": stepname });
    });
    return dataRow;
  }
  // Charts

  resetSignupPage = () => {
    this.setState({
                  username: "",
                  password: "",
                  reenteredpassword: "",
                  activationkey: ""}, this.ValidatePageElements);
}
  resetLoginPage = () => {
    this.setState({
                  username: "",
                  password: ""}, this.ValidatePageElements);
  }

// Validation functions
  ValidatePageElements = () => {
    // user login data
    var myValidationObjects = this.state.validationObjects;

    const { username, password, reenteredpassword, activationkey, webPage } = this.state;
    if (webPage === 'signup') {
      if (username != "") {
          if (password != "") {
              if (reenteredpassword != "") {
                  if (password === reenteredpassword) {
                      if (activationkey != "") {
                          myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="signupSubmitButton")].enabled = true;
                          this.setState({validationObjects: myValidationObjects})                 
                      }
                  }               
              }
          }
      } else {
        myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="signupSubmitButton")].enabled = false;
        this.setState({validationObjects: myValidationObjects})                 
}
    } else if (this.state.webPage==="login") {
      if ((this.state.username === "") || (this.state.password === "")) {
        myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled = false;
        this.setState({validationObjects: myValidationObjects})
      } else {
        myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="loginSubmitButton")].enabled = true;
        this.setState({validationObjects: myValidationObjects})
      }
    }

    if ((this.state.scenarioInputFiles.length > 0) && (this.state.scenarioName != "")) {
      myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="SubmitScenarioButton")].enabled = true;
      this.setState({validationObjects: myValidationObjects})
    } else {
      myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="SubmitScenarioButton")].enabled = false;
      this.setState({validationObjects: myValidationObjects})
    }
  }

// API calling functions

  copyModelToScenarioFolder = (modelPathname, scenarioFolderPathname, copyFolderContents) => {
    API.copyModelToScenarioFolder(modelPathname, 
                                  scenarioFolderPathname, 
                                  copyFolderContents)
    .then(res => this.ExtendSimASPsendFiles(0))
  };

  ExtendSimASPsendFiles = (fileIndex) => {
    var queryNameURL = "/api/ExtendSim/sendfilename/";
    if (this.state.scenarioInputFiles.length) {
      const ExtendSimASPsendFiles = this.ExtendSimASPsendFiles;
      const files = this.state.scenarioInputFiles;
      const scenarioFolderPathname = this.state.scenarioFolderPathname;
      const userLoginSessionID = this.state.userLoginSessionID;
      const modelPathname = this.state.scenarioFolderPathname + "/" + this.state.ExtendSimModels[1].name;
      const ExtendSimASPsubmitSimulationScenario = this.ExtendSimASPsubmitSimulationScenario;

      var reader = new FileReader();
      reader.onload = function(event) {
        // var filename = this.state.scenarioInputFiles[fileIndex].name;
        var filename = files[fileIndex].name;
        event.preventDefault();
        API.sendfile(scenarioFolderPathname,
                      filename,
                      reader.result)
        .then(res => {
            fileIndex++;
            if (fileIndex < files.length) {
              // recursively call until all files have been sent to the server
              ExtendSimASPsendFiles(fileIndex);
            } else {
              ExtendSimASPsubmitSimulationScenario(
                userLoginSessionID,
                modelPathname,
                true);
            }
          })
      };
      reader.readAsBinaryString(files[fileIndex]);
    }
  }

  ExtendSimASPsubmitSimulationScenario = (userLoginSessionID, 
                                          modelPathname, 
                                          removeFolderOnCompletion) => {
    //  Submit the scenario to the server
    API.submitSimulationScenario(
      userLoginSessionID, 
      modelPathname, 
      removeFolderOnCompletion)
    .then(res => {
      this.setState({scenarioID: res.data.scenarioID});
      checkModelStatusTimer = setInterval(this.ExtendSimASPCheckModelRunStatus, 1000);
    })
  };

  ExtendSimASPCheckModelRunStatus = () => {
    const { scenarioResultTypes } = this.state;
    const cycletimesindex = scenarioResultTypes.findIndex(obj => obj.type==="Cycle-times");
    const resourcesindex = scenarioResultTypes.findIndex(obj => obj.type==="Resources");
    const poolindex = scenarioResultTypes.findIndex(obj => obj.type==="Pools");
    const modelindex = scenarioResultTypes.findIndex(obj => obj.type==="Model");

    API.checkmodelrunstatus(
      this.state.scenarioID)
    .then(res => {
      if (res.data.modelRunStatus == runCompletedScenarioStatus) {
        clearInterval(checkModelStatusTimer);
        this.setState({scenarioRunStatus: "Getting results"})
        API.getcycletimeresults(this.state.scenarioFolderPathname + scenarioResultTypes[cycletimesindex].filename, 
                                this.state.userLoginSessionID,
                                this.state.scenarioID,
                                this.state.username)
        .then(res1 => {
          API.getresourceresults(this.state.scenarioFolderPathname + scenarioResultTypes[resourcesindex].filename, 
                                 this.state.userLoginSessionID,
                                 this.state.scenarioID,
                                 this.state.username)
          .then(res2 => {
            var myValidationObjects = this.state.validationObjects;
            myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="ShowResultsButton")].enabled = true;
            this.setState({validationObjects: myValidationObjects});
            this.setState({scenarioRunStatus: "Completed"})
          })
        })
      } else if (res.data.modelRunStatus == runInProcessScenarioStatus) {
        this.setState({scenarioRunStatus: "Running"})
      }
    })
  }

// Event handlers
  handleUserInputChange = (key, value, webPage) => {
    this.setState({ [key]: value,
                    webPage: webPage }, this.ValidatePageElements);
    if (webPage === "login") {
      this.setState({ errorLoginPage: "" });
    } else if  (webPage === "signup") {
      this.setState({ errorSignupPage: "" });
    }
  };

  handleDropEvents = (acceptedFiles) => {
    this.setState({scenarioInputFiles: acceptedFiles});
    this.ValidatePageElements();
  }

  handleLoginSubmit = (event, history) => {
    var myValidationObjects = this.state.validationObjects;

    event.preventDefault();
    API.login(this.state)
    .then(res => {
      this.setState({ userLoginSessionID: res.data.userLoginSessionID});
      // Enable scenario navbar link
      myValidationObjects[myValidationObjects.findIndex(obj => obj.name==="Scenario-navbar-option")].enabled = true;
      this.setState({validationObjects: myValidationObjects});
      API.getUserScenarios(this.state.username)
        .then(res2 => {
          this.setState({userScenarios: res2.data.userScenarios},
            () => history.push('/scenario-setup'));
        })
        .catch(function(error){
          /* potentially some code for generating an error specific message here */
          history.push('/scenario-setup');
        });
        
    })
    .catch(err => {
        alert("Error");
        console.log(JSON.stringify(err.response.data.msg));
        this.setState({ errorLoginPage: err.response.data.msg }, this.resetLoginPage);
        
      });
    };

  handleSignupSubmit = (event, history) => {
    event.preventDefault();
    API.signup(this.state)
    .then(res => {
      this.handleLoginSubmit(event, history);
        // history.push('/login');
    })
    .catch(err => {
        console.log(err.response.data);
        this.setState({ errorSignupPage: err.response.data.msg }, this.resetSignupPage);
    })
  }

  handleSubmitSimulationScenario = (event) => {
    event.preventDefault();
    const {validationObjects} = this.state;
    validationObjects[validationObjects.findIndex(obj => obj.name==="SubmitScenarioButton")].enabled = false;
    this.setState({validationObjects : validationObjects})
    API.createScenario(this.state)
    .then(res_createScenario => {
      API.createScenarioFolder(this.state.userLoginSessionID, this.state.scenarioName, this.state.scenarioName)
      .then(res => {
        this.setState({scenarioRunStatus: "Submitted"});
        this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname});
        const modelfilepath = this.state.modelpath + "/" + this.state.ExtendSimModels[1].name;
        this.copyModelToScenarioFolder(modelfilepath, 
                                       res.data.scenarioFolderPathname, 
                                       true); 
      })
    });
  };

  handleShowResults = (event, history) => {
    event.preventDefault();
      API.getUserScenarios(this.state.username)
      .then(res2 => {
        this.setState({userScenarios: res2.data.userScenarios});
        console.log('scenario results=' + JSON.stringify(res2));
        history.push('/scenarios-summary');
      });
    // })
  };

  handleTableSelectionDeleteScenario = (event, scenarioID, history) => {
    event.preventDefault();
    API.deleteScenario(this.username)
    .then(res => {
      API.getUserScenarios(this.state.username)
      .then(res2 => {
        history.push('/scenarios-summary');
      })
    })
  }
  handleShowTableRowResults = (event,
                               scenarioID, 
                               history
                              ) => {
    event.preventDefault();
    // We need to lookup the scenario folder pathname using the scenario ID
    const selectedScenario = this.getMatchingScenario(scenarioID);
    const scenarioFolderPathname = selectedScenario.scenarioFolderPathname;
    const scenarioName = selectedScenario.scenarioName;
    const {username, userLoginSessionID, cycleTimeResultsFilename} = this.state;
    const currentScenarioID = scenarioID
    console.log("scenarioFolderPathname=" + scenarioFolderPathname + 
          " cycleTimeResultsFilename=" + cycleTimeResultsFilename + 
          " userLoginSessionID=" +userLoginSessionID);
    API.getScenarioCycletimeData (scenarioID, username) 
    .then(res1 => {
      console.log('scenario cycleTimeData=' + res1.data.cycleTimeData);
      // var parsedArray = res1.data.cycleTimeData.split('\r\n').map(function(ln){
      //   return ln.split('\t');
      // });
      // console.log('parsedArray=' + parsedArray);
      this.setState({cycleTimeData: res1.data.cycleTimeData});
      // cycleTimeChartXAxisLabels: [],
  
      this.setState({scenarioID: currentScenarioID});
      this.setState({scenarioName: scenarioName});
      history.push('/cycle-time-results');
    });
  }

  handleTableSelectionShowScenarioResults = (event,
                                             scenarioID, 
                                             history) => {
    event.preventDefault();
    // We need to lookup the scenario folder pathname using the scenario ID
    const selectedScenario = this.getMatchingScenario(scenarioID);
    this.setState({ scenarioFolderPathname: selectedScenario.scenarioFolderPathname,
                    scenarioName: selectedScenario.scenarioName,
                    scenarioID: scenarioID}, () => history.push('/scenario-results'));
  }

  handleShowScenarioResults = (event,
                               resultType,
                               history) => {
    event.preventDefault();
    // We need to lookup the scenario folder pathname using the scenario ID
    const {username, scenarioID} = this.state;
    if (resultType === "Cycle-times") {
      API.getScenarioCycletimeData (scenarioID, username) 
      .then(res1 => {
        console.log('scenario cycleTimeData=' + res1.data.cycleTimeData);
        this.setState({cycleTimeData: res1.data.cycleTimeData});
        // var data = this.makeCycleTimeChartData(res1.data.cycleTimeData, 'totalJobsProcessed');
  
        this.setState({cycleTimeChartData: 
          {
            totalJobsProcessed: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'totalJobsProcessed'),
            totalWaitTime: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'totalWaitTime'),
            avgProcessTime: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'avgProcessTime'),
            avgWaitTime: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'avgWaitTime'),
            avgCycleTime: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'avgCycleTime'),
            CoVarrivals: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'CoVarrivals'),
            CoVdepartures: this.makeCycleTimeChartData(res1.data.cycleTimeData, 'CoVdepartures')
          }
        });  
        history.push('/cycle-time-results');
      });
    } else if (resultType === "Resources") {
      API.getResourceData (scenarioID, username) 
      .then(res1 => {
        console.log('scenario resourceData=' + res1.data.resourceData);
        this.setState({resourceData: res1.data.resourceData});
        history.push('/resource-results');
      });
    }
  }

  renderCycleTimeTableData = () => {
    // event.preventDefault();
    return this.state.cycleTimeData.map((rowData, key) => {
      const {
              stepname, 
              resourceRequirement, 
              totalJobsProcessed, 
              totalProcessTime, 
              totalWaitTime,
              avgProcessTime,
              avgWaitTime,
              avgCycleTime,
              CoVarrivals,
              CoVdepartures
            } = rowData; //destructuring
       return (
        <tr key={key}>             
          <td className="table-data-strings">{stepname}</td>
          <td className="table-data-strings">{resourceRequirement}</td>
          <td className="table-data-numbers">{totalJobsProcessed}</td>
          <td className="table-data-numbers">{totalProcessTime.toFixed(2)}</td>
          <td className="table-data-numbers">{totalWaitTime.toFixed(2)}</td>
          <td className="table-data-numbers">{avgProcessTime.toFixed(2)}</td>
          <td className="table-data-numbers">{avgWaitTime.toFixed(2)}</td>
          <td className="table-data-numbers">{avgCycleTime.toFixed(2)}</td>
          <td className="table-data-numbers">{CoVarrivals.toFixed(2)}</td>
          <td className="table-data-numbers">{CoVdepartures.toFixed(2)}</td>
        </tr> 
       )
    })  
  }

  renderResourcesTableData = () => {
    // event.preventDefault();
    return this.state.resourceData.map((rowData, key) => {
      const {
        ResourceID,
        Pool,
        TotalOrdersServiced,
        TotalIdleTime,
        TotalBusyTime,
        TotalBusyOffShiftTime,
        TotalDownTime,
        TotalOffShiftTime,
        TotalFailedTime,
        TotalScheduledDownTime,
        TotalUnscheduledDownTime,
        TotalQuantityAllocationTime,
        QuantityUtilization,
        Utilization
          } = rowData; //destructuring
       return (
        <tr key={key}>  
          <td className="table-data-strings">{ResourceID}</td>
          <td className="table-data-strings">{Pool}</td>
          <td className="table-data-numbers">{TotalOrdersServiced}</td>
          <td className="table-data-numbers">{TotalIdleTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalBusyTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalBusyOffShiftTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalDownTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalOffShiftTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalFailedTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalScheduledDownTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalUnscheduledDownTime.toFixed(2)}</td>
          <td className="table-data-numbers">{TotalQuantityAllocationTime.toFixed(2)}</td>
          <td className="table-data-numbers">{QuantityUtilization.toFixed(2)}</td>
          <td className="table-data-numbers">{Utilization.toFixed(2)}</td>
        </tr> 
       )
    })  
  }

  renderUserScenariosTableData = (handleTableRowResults, handleDeleteSelectedScenario) => {
    return this.state.userScenarios.map((scenario, index) => {
      const { userLoginSessionID, 
              username, 
              scenarioID, 
              scenarioFolderPathname, 
              scenarioSubmissionDateTime,
              scenarioCompletionDateTime} = scenario; //destructuring
       return (
          <tr key={scenarioID}>
             <td>{scenarioID}</td>
             <td>{userLoginSessionID}</td>
             <td>{username}</td>
             <td>{scenarioSubmissionDateTime}</td>
             <td>{scenarioCompletionDateTime}</td>
             <td>
              {/* <button id={scenarioID} onClick={(event) => handleTableRowResults(event)}> */}
              <button name={scenarioID} onClick={(event) => handleTableRowResults(event)}>
               Show
               </button></td>
             <td>
             <button name={scenarioID} onClick={(event) => handleDeleteSelectedScenario(event)}>
                 Delete
                </button></td>
          </tr>
       )
    })
 }

 renderUserScenarioResultsTableData = (handleShowScenarioResults) => {
  return this.state.scenarioResultTypes.map((resultType, key) => {
    const { type, filename } = resultType; //destructuring
     return (
        <tr key={key}>
           <td>{type}</td>
           <td>
             <button id={type} onClick={(event) => handleShowScenarioResults(event)}>
             Show
             </button>
          </td>
        </tr>
     )
  })
}

  render() {
    return (
      <Context.Provider value={{
        user: this.state.currentUser,
        username: this.state.username,
        password: this.state.password,
        reenteredpassword: this.state.reenteredpassword,
        activationkey: this.state.activationkey,
        userLoginSessionID: this.state.userLoginSessionID,
        scenarioID: this.state.scenarioID,
        scenarioName: this.state.scenarioName,
        scenarioFolderPathname: this.state.scenarioFolderPathname,
        validationObjects: this.state.validationObjects,
        scenarioRunStatus: this.state.scenarioRunStatus,
        cycleTimeData: this.state.cycleTimeData,
        cycleTimeChartData: this.state.cycleTimeChartData,
        errorLoginPage: this.state.errorLoginPage,
        errorSignupPage: this.state.errorSignupPage,
        handleUserInputChange: this.handleUserInputChange,
        handleDropEvents: this.handleDropEvents,
        handleSignupSubmit: this.handleSignupSubmit,
        handleLoginSubmit: this.handleLoginSubmit,
        handleSubmitSimulationScenario: this.handleSubmitSimulationScenario,
        handleShowScenarioResults: this.handleShowScenarioResults,
        handleShowResults: this.handleShowResults,
        handleShowTableRowResults: this.handleShowTableRowResults,
        handleTableSelectionShowScenarioResults: this.handleTableSelectionShowScenarioResults,
        handleTableSelectionDeleteScenario: this.handleTableSelectionDeleteScenario,
        renderUserScenariosTableData: this.renderUserScenariosTableData,
        renderCycleTimeTableData: this.renderCycleTimeTableData,
        renderResourcesTableData: this.renderResourcesTableData,
        renderUserScenarioResultsTableData: this.renderUserScenarioResultsTableData
        

      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
