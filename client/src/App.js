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

// function App() 
class App extends React.Component {
  state = {
    username: "",
    password: "",
    userSessionID: "",
    scenarioName: "",
    scenarioFolderPathname: "",
    scenarioInputFiles: []
  };
  componentDidMount () {
      alert("ComponentDidMount - App");
  };

  ExtendSimASPcreateScenarioFolder = (myScenarioFolderName) => {
    alert("ExtendSimASPcreateScenarioFolder - scenario name=" + myScenarioFolderName);
    // Execute WCF service to create a scenario folder
    // var queryURL = "http://184.171.246.58:8090/StreamingService/web/CreateScenarioFolder?scenarioFoldername=myScenarioFolder"
    // var queryURL =
    //   urlPrefix + "/api/createscenariofolder/" + myScenarioFolderName;
      API.createScenarioFolder(myScenarioFolderName)
      .then(res => console.log("ExtendSimASPcreateScenarioFolder: res.data=" + res.data))
      // .then(res => this.setState({scenarioFolderPathname: res.data}))
    // $.ajax({
    //   url: queryURL,
    //   method: "get",
    //   accept: "application/json",
    //   contentType: "application/json;charset=utf-8",
    //   headers: myheaders,
    //   muteHttpExceptions: false
    // }).then(function(response) {
    //   console.log("ExtendSimASPcreateScenarioFolder: " + response);
    //   scenarioFolderPathname = response;
    //   $("#scenario-folder-pathname").val(scenarioFolderPathname);
    //   ExtendSimASPcopyModelToScenarioFolder(scenarioFolderPathname);
    // });
  };

  handleLoginOnSubmitEvent = (event) => {
    event.preventDefault();
    API.login(this.state)
    .then(res => this.setState({ userSessionID: res.data.userSessionID}))
    // .then(res => this.setState({ userSessionID: res.userSessionID}))
    // .then(res => localStorage.setItem('current_user_token', res.data.token))
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  };

  handleOnChangeEvents = key => e => this.setState({ [key]: e.target.value });

  handleDropEvents = (acceptedFiles) => {
    this.setState({scenarioInputFiles: acceptedFiles});
    alert("Dropped a big one! Num files=" + this.state.scenarioInputFiles.length);
  }

  handleSubmitSimulationScenarioBtnClick = (event) => {
    event.preventDefault();
    alert("handleSubmitSimulationScenarioBtnClick");
    API.createScenarioFolder(this.state.scenarioName)
    .then(res => this.setState({scenarioFolderPathname: res.data.scenarioFolderPathname}))
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
                (userSessionID, scenarioFolderPathname, handleOnChangeEvents, handleDropEvents, handleSubmitSimulationScenarioBtnClick) => (
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
