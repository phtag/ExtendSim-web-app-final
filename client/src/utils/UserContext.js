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
    signupusername: "",
    signuppassword: "",
    signuprepeatpassword: "",
    userLoginSessionID: "",
    scenarioRunStatus: "",
    validationObjects: [
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

// Validation functions
  ValidatePageElements = () => {
    // user login data
    var myValidationObjects = this.state.validationObjects;

    if ((this.state.username === "") || (this.state.password === "")) {
      myValidationObjects[0].enabled = false;
      this.setState({validationObjects: myValidationObjects})
    } else {
      myValidationObjects[0].enabled = true;
      this.setState({validationObjects: myValidationObjects})
    }

    if ((this.state.scenarioInputFiles.length > 0) && (this.state.scenarioName != "")) {
      myValidationObjects[1].enabled = true;
      this.setState({validationObjects: myValidationObjects})
    } else {
      myValidationObjects[1].enabled = false;
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

  ExtendSimASPsubmitSimulationScenario = (
    userLoginSessionID, 
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
        var myValidationObjects = this.state.validationObjects;
        myValidationObjects[2].enabled = true;
        this.setState({validationObjects: myValidationObjects});
        this.setState({scenarioRunStatus: "Completed"})
      } else if (res.data.modelRunStatus == runInProcessScenarioStatus) {
        this.setState({scenarioRunStatus: "Running"})
      }
    })
  }

// Event handlers
  handleUserInputChange = (key, value) => {
    this.setState({ [key]: value }, this.ValidatePageElements);
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
      myValidationObjects[5].enabled = true;
      this.setState({validationObjects: myValidationObjects});
      history.push('/scenarios');
   })
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  };

  handleSubmitSimulationScenario = (event) => {
    event.preventDefault();
    API.createScenarioFolder(this.state.userLoginSessionID, this.state.scenarioName)
    .then(res => {
      this.setState({scenarioRunStatus: "Submitted"});
      this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname});
      this.copyModelToScenarioFolder(this.state.modelPathname, 
                                     res.data.scenarioFolderPathname, 
                                    true); 
      // this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname},
      //     this.copyModelToScenarioFolder(this.state.modelPathname, 
      //                                  res.data.scenarioFolderPathname, 
      //                                  true)); 
    })
    // .then(res => console.log("handleSubmitSimulationScenarioBtnClick: res.data.scenarioFolderPathname=" + res.data.scenarioFolderPathname))
  };

  handleShowResults = (event, history) => {
    event.preventDefault();
    API.getcycletimeresults(this.state.scenarioFolderPathname + cycleTimeResultsFilename, 
                            this.state.userLoginSessionID,
                            this.state.scenarioID)
    .then(res1 => {
      console.log('scenario results=' + res1.data);
      API.getUserScenarios(this.state.username)
      .then(res2 => {
        this.setState({userScenarios: res2.data.userScenarios});
        console.log('scenario results=' + JSON.stringify(res2));
        history.push('/scenarios-summary');
      });
    })
  };

  handleShowTableRowResults = (event,
                               scenarioID, 
                               history
                              ) => {
    event.preventDefault();
    // We need to lookup the scenario folder pathname using the scenario ID
    const selectedScenario = this.getMatchingScenario(scenarioID);
    const scenarioFolderPathname = selectedScenario.scenarioFolderPathname;
    const {userLoginSessionID, cycleTimeResultsFilename} = this.state;
    console.log("scenarioFolderPathname=" + scenarioFolderPathname + 
          " cycleTimeResultsFilename=" + cycleTimeResultsFilename + 
          " userLoginSessionID=" +userLoginSessionID);
    API.getScenarioCycletimeData (scenarioID, userLoginSessionID) 
    .then(res1 => {
      alert('Successfully returned cycle-time data');
      console.log('scenario cycleTimeData=' + res1.data.cycleTimeData);
      // var parsedArray = res1.data.cycleTimeData.split('\r\n').map(function(ln){
      //   return ln.split('\t');
      // });
      // console.log('parsedArray=' + parsedArray);
      this.setState({cycleTimeData: res1.data.cycleTimeData});
      history.push('/cycle-time-results');
    });
  }

  renderCycleTimeTableData = () => {
    // event.preventDefault();
    alert('this.state.cycleTimeData.length=' + this.state.cycleTimeData.length);
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
          <td>{stepname}</td>
            <td>{resourceRequirement}</td>
            <td>{totalJobsProcessed}</td>
            <td>{totalProcessTime}</td>
            <td>{totalWaitTime}</td>
            <td>{avgProcessTime}</td>
            <td>{avgWaitTime}</td>
            <td>{avgCycleTime}</td>
            <td>{CoVarrivals}</td>
            <td>{CoVdepartures}</td>
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

  render() {
    return (
      <Context.Provider value={{
        user: this.state.currentUser,
        username: this.state.username,
        password: this.state.password,
        userLoginSessionID: this.state.userLoginSessionID,
        scenarioID: this.state.scenarioID,
        scenarioName: this.state.scenarioName,
        scenarioFolderPathname: this.state.scenarioFolderPathname,
        validationObjects: this.state.validationObjects,
        scenarioRunStatus: this.state.scenarioRunStatus,
        cycleTimeData: this.state.cycleTimeData,
        handleUserInputChange: this.handleUserInputChange,
        handleDropEvents: this.handleDropEvents,
        handleLoginSubmit: this.handleLoginSubmit,
        handleSubmitSimulationScenario: this.handleSubmitSimulationScenario,
        handleShowResults: this.handleShowResults,
        handleShowTableRowResults: this.handleShowTableRowResults,
        renderUserScenariosTableData: this.renderUserScenariosTableData,
        renderCycleTimeTableData: this.renderCycleTimeTableData
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
