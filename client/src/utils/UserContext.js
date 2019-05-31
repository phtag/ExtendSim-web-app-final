import React from 'react';
import API from './API';

const Context = React.createContext();
const initialState = { currentUser: {} };
const UserContext = React.createContext(initialState);
const ExtendSimModelName = "/ASP example model (GS).mox";
// ExtendSim server (use this for Heroku)
const ExtendSimModelPath =
  "C:/Users/Administrator/Documents/ExtendSim10ASP_Prod/ASP/ASP Servers/ExtendSim Models" +
  ExtendSimModelName;
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
    modelPathname: ExtendSimModelPath,
    cycleTimeResultsFilename: "/Cycle Time Results.txt",
    scenarioName: "",
    scenarioID: -1,
    scenarioFolderPathname: "",
    ExtendSimModelName: "/ASP example model (GS).mox",
    scenarioInputFiles: [],
    userScenarios: [],
    cycleTimeData: []
  }
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
      const modelPathname = this.state.scenarioFolderPathname + this.state.ExtendSimModelName;
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
    API.checkmodelrunstatus(
      this.state.scenarioID)
    .then(res => {
      if (res.data.modelRunStatus == runCompletedScenarioStatus) {
        clearInterval(checkModelStatusTimer);
        this.setState({scenarioRunStatus: "Getting results"})
        API.getcycletimeresults(this.state.scenarioFolderPathname + cycleTimeResultsFilename, 
                                this.state.userLoginSessionID,
                                this.state.scenarioID,
                                this.state.username)
        .then(res1 => {
          API.getresourceresults(this.state.scenarioFolderPathname + cycleTimeResultsFilename, 
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
    this.setState({ error: "" });
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
      history.push('/scenarios');
    })
    .catch(err => {
        alert("Error");
        console.log(JSON.stringify(err.response.data.msg));
        this.setState({ error: err.response.data.msg }, this.resetLoginPage);
        
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
        this.setState({ error: err.response.data.msg }, this.resetSignupPage);
    })
  }

  handleSubmitSimulationScenario = (event) => {
    event.preventDefault();
    API.createScenario(this.state)
    .then(res_createScenario => {
      API.createScenarioFolder(this.state.userLoginSessionID, this.state.scenarioName, this.state.scenarioName)
      .then(res => {
        this.setState({scenarioRunStatus: "Submitted"});
        this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname});
        this.copyModelToScenarioFolder(this.state.modelPathname, 
                                      res.data.scenarioFolderPathname, 
                                      true); 
      })
    });
  };

  handleShowResults = (event, history) => {
    event.preventDefault();
    // API.getcycletimeresults(this.state.scenarioFolderPathname + cycleTimeResultsFilename, 
    //                         this.state.userLoginSessionID,
    //                         this.state.scenarioID,
    //                         this.state.username)
    // .then(res1 => {
      // console.log('scenario results=' + res1.data);
      API.getUserScenarios(this.state.username)
      .then(res2 => {
        this.setState({userScenarios: res2.data.userScenarios});
        console.log('scenario results=' + JSON.stringify(res2));
        history.push('/scenarios-summary');
      });
    // })
  };

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
      this.setState({scenarioID: currentScenarioID});
      this.setState({scenarioName: scenarioName});
      history.push('/cycle-time-results');
    });
  }

  handleScenarioSummarySelection = (event,
                                    scenarioID, 
                                    history) => {
    event.preventDefault();
    // We need to lookup the scenario folder pathname using the scenario ID
    const selectedScenario = this.getMatchingScenario(scenarioID);
    alert('handleScenarioSummarySelection: scenarioID=' + scenarioID + " scenario folder pathname=" + selectedScenario.scenarioFolderPathname)

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
    alert("handleShowScenarioResults: scenarioID=" + scenarioID + " username=" + username);
    API.getScenarioCycletimeData (scenarioID, username) 
    .then(res1 => {
      console.log('scenario cycleTimeData=' + res1.data.cycleTimeData);
      this.setState({cycleTimeData: res1.data.cycleTimeData});
      history.push('/cycle-time-results');
    });
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
  renderUserScenariosTableData = (handleTableRowResults) => {
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
               <button id={scenarioID} onClick={(event) => handleTableRowResults(event)}>
               Show
               </button></td>
             <td>
               <button>
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
             <button id={key} onClick={(event) => handleShowScenarioResults(event)}>
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
        error: this.state.error,
        handleUserInputChange: this.handleUserInputChange,
        handleDropEvents: this.handleDropEvents,
        handleSignupSubmit: this.handleSignupSubmit,
        handleLoginSubmit: this.handleLoginSubmit,
        handleSubmitSimulationScenario: this.handleSubmitSimulationScenario,
        handleShowScenarioResults: this.handleShowScenarioResults,
        handleShowResults: this.handleShowResults,
        handleShowTableRowResults: this.handleShowTableRowResults,
        handleScenarioSummarySelection: this.handleScenarioSummarySelection,
        renderUserScenariosTableData: this.renderUserScenariosTableData,
        renderCycleTimeTableData: this.renderCycleTimeTableData,
        renderUserScenarioResultsTableData: this.renderUserScenarioResultsTableData
        

      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
