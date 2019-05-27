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
    scenarioName: "",
    scenarioID: -1,
    scenarioFolderPathname: "",
    ExtendSimModelName: "/ASP example model (GS).mox",
    scenarioInputFiles: []
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
      alert("ExtendSimASPsubmitSimulationScenario: Successfully submitted!!");
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
    API.getScenarioResults(this.state.scenarioFolderPathname + cycleTimeResultsFilename, this.state.userLoginSessionID)
    .then(res1 => {
      alert("Successfully got scenario results");
      console.log('scenario results=' + res1.data);
      history.push('/results');
      API.getUserScenarios(this.state.userLoginSessionID)
      .then(res2 => {
        alert("Successfully got user scenarios");
        console.log('scenario results=' + res2.data);
  
      });
    })
  };


  render() {
    return (
      <Context.Provider value={{
        user: this.state.currentUser,
        username: this.state.username,
        password: this.state.password,
        userLoginSessionID: this.state.userLoginSessionID,
        scenarioName: this.state.scenarioName,
        scenarioFolderPathname: this.state.scenarioFolderPathname,
        validationObjects: this.state.validationObjects,
        scenarioRunStatus: this.state.scenarioRunStatus,
        handleUserInputChange: this.handleUserInputChange,
        handleDropEvents: this.handleDropEvents,
        handleLoginSubmit: this.handleLoginSubmit,
        handleSubmitSimulationScenario: this.handleSubmitSimulationScenario,
        handleShowResults: this.handleShowResults
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
