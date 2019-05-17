import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Scenarios from './pages/Scenarios';
import Results from './pages/Results';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import { CounterProvider } from './context';
import API from './utils/API';

const initialState = { currentUser: {} };
const UserContext = React.createContext(initialState);

const urlPrefix = "";
var ExtendSimModelName = "/ASP example model (GS).mox";
// ExtendSim server (use this for Heroku)
var ExtendSimModelPath =
  "C:/Users/Administrator/Documents/ExtendSim10ASP_Prod/ASP/ASP Servers/ExtendSim Models" +
  ExtendSimModelName;

// function App() 
class App extends React.Component {
  state = {
    username: "",
    password: "",
    userSessionID: "",
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
    ],
    modelPathname: ExtendSimModelPath,
    scenarioName: "",
    scenarioFolderPathname: "",
    scenarioInputFiles: []
  };
  componentDidMount () {
      alert("ComponentDidMount - App");      
  };

  ValidatePageElements = () => {
    var myValidationObjects = this.state.validationObjects;
    if ((this.state.scenarioInputFiles.length > 0) && (this.state.scenarioName != "")) {
      myValidationObjects[1].enabled = true;
      this.setState({validationObjects: myValidationObjects})
    } else {
      myValidationObjects[1].enabled = false;
      this.setState({validationObjects: myValidationObjects})
    }
  }

  handleLoginOnSubmitEvent = (event) => {
    event.preventDefault();
    API.login(this.state)
    .then(res => this.setState({ userSessionID: res.data.userSessionID}))
    // .then(res => this.setState({ userSessionID: res.userSessionID}))
    // .then(res => localStorage.setItem('current_user_token', res.data.token))
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  };

  handleOnChangeEvents = key => e => {
    this.setState({ [key]: e.target.value }, this.ValidatePageElements);
  };

  handleDropEvents = (acceptedFiles) => {
    this.setState({scenarioInputFiles: acceptedFiles});
    this.ValidatePageElements();
    alert("Dropped a big one! Num files=" + this.state.scenarioInputFiles.length);
  }

  handleSubmitSimulationScenarioBtnClick = (event) => {
    event.preventDefault();
    API.createScenarioFolder(this.state.scenarioName)
    .then(res => {
      this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname},
        API.copyModelToScenarioFolder(this.state.modelPathname, 
                                      res.data.scenarioFolderPathname, 
                                      true)); 
    })
    // .then(res => console.log("handleSubmitSimulationScenarioBtnClick: res.data.scenarioFolderPathname=" + res.data.scenarioFolderPathname))
  };



  render () {
    return (
      <Router>
        {/* <CounterProvider> */}
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/login" render={
                (handleLoginOnSubmitEvent, handleOnChangeEvents) => (
                <Login {...this} />)} />
              <Route exact path="/scenarios" render={
                (
                  userSessionID, 
                  scenarioFolderPathname, 
                  validationObjects,
                  handleOnChangeEvents, 
                  handleDropEvents, 
                  handleSubmitSimulationScenarioBtnClick
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
