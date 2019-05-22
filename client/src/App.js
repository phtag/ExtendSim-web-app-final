import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Scenarios from './pages/Scenarios';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import API from './utils/API';
import history from "./pages/History";

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

// function App() 
class App extends React.Component {
  state = {
    username: "",
    password: "",
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
  };
  componentDidMount () {
  };

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

  updateHistory = (history, route) => {
    history.push(route);
  }

  handleLoginOnSubmitEvent = history => event => {
    var myValidationObjects = this.state.validationObjects;

    event.preventDefault();
    API.login(this.state)
    .then(res => {
      this.setState({ userLoginSessionID: res.data.userLoginSessionID}, this.updateHistory(history, "/scenarios"));
      // Enable scenario navbar link
      myValidationObjects[5].enabled = true;
      this.setState({validationObjects: myValidationObjects})
   })
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  };

  handleOnChangeEvents = key => e => {
    this.setState({ [key]: e.target.value }, this.ValidatePageElements);
  };

  handleDropEvents = (acceptedFiles) => {
    this.setState({scenarioInputFiles: acceptedFiles});
    this.ValidatePageElements();
  }

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
              alert("Submitting request to start running scenario: userLoginSessionID=" + userLoginSessionID);
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
    alert('ExtendSimASPsubmitSimulationScenario: submitting simulation scenario');
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
        this.setState({validationObjects: myValidationObjects})
      }
    })

  }
  handleSubmitSimulationScenarioBtnClick = (event) => {
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

  handleShowResultsButtonClick = (event) => {
    event.preventDefault();
    API.getScenarioResults(cycleTimeResultsFilename, this.state.userLoginSessionID)
    .then(res => {
      alert("Successfully got scenario results");
      this.updateHistory(history, "/results");
    })
    // .then(res => console.log("handleSubmitSimulationScenarioBtnClick: res.data.scenarioFolderPathname=" + res.data.scenarioFolderPathname))
  };

  render () {
    return (
      <Router>
        {/* <CounterProvider> */}
          <div>
            <Navbar {...this}/>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/signup" render={
                (
                  validationObjects,
                  handleLoginOnSubmitEvent, 
                  handleOnChangeEvents) => (
                <Signup {...this} />)} />
              <Route exact path="/login" render={
                (
                  validationObjects,
                  handleLoginOnSubmitEvent, 
                  handleOnChangeEvents) => (
                <Login {...this} />)} />
              <Route exact path="/scenarios" render={
                (
                  userLoginSessionID, 
                  scenarioFolderPathname, 
                  validationObjects,
                  handleOnChangeEvents, 
                  handleDropEvents, 
                  handleSubmitSimulationScenarioBtnClick,
                  handleShowResultsButtonClick
                ) => (
                <Scenarios {...this} />)} />
              {/* <Route exact path="/scenarios" component={Scenarios} /> */}
              <Route exact path="/results" component={Results} />
              {/* <Route exact path="/signup" component={Signup} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        {/* </CounterProvider> */}
      </Router>
    );
  }
}

export default App;
