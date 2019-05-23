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
      alert('Push to scenarios page');
      history.push('/scenarios');
   })
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  };

  handleSubmitSimulationScenario = (event, history) => {
    event.preventDefault();
    API.createScenarioFolder(this.state.userLoginSessionID, this.state.scenarioName)
    .then(res => {
      this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname},
        this.copyModelToScenarioFolder(this.state.modelPathname, 
                                       res.data.scenarioFolderPathname, 
                                       true)); 
    })
    // .then(res => console.log("handleSubmitSimulationScenarioBtnClick: res.data.scenarioFolderPathname=" + res.data.scenarioFolderPathname))
  };


  render(){
    return (
      <Context.Provider value={{
        user: this.state.currentUser,
        username: this.state.username,
        password: this.state.password,
        userLoginSessionID: this.state.userLoginSessionID,
        scenarioName: this.state.scenarioName,
        validationObjects: this.state.validationObjects,
        handleUserInputChange: this.handleUserInputChange,
        handleDropEvents: this.handleDropEvents,
        handleLoginSubmit: this.handleLoginSubmit,
        handleSubmitSimulationScenario: this.handleSubmitSimulationScenario
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
