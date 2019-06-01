import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import ScenarioSetup from './pages/ScenarioSetup';
import CycleTimeResults from './pages/CycleTimeResults';
import ResourceResults from './pages/ResourceResults';
import ScenarioResults from './pages/ScenarioResults';
import ScenariosSummary from './pages/ScenariosSummary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import history from "./pages/History";
import {UserProvider} from './utils/UserContext';

// function App() 
class App extends React.Component {
  render () {
    return (
      <UserProvider>
        <Router>
            <div>
              <Navbar {...this}/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/scenario-setup" component={ScenarioSetup} />
                <Route exact path="/scenarios-summary" component={ScenariosSummary} />
                <Route exact path="/scenario-results" component={ScenarioResults} />
                <Route exact path="/cycle-time-results" component={CycleTimeResults} />
                <Route exact path="/resource-results" component={ResourceResults} />
                <Route component={NoMatch} />
              </Switch>
            </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
