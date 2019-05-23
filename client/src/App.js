import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Scenarios from './pages/Scenarios';
import Results from './pages/Results';
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
                {/* <Route exact path="/scenarios" component={Scenarios} /> */}
                {/* <Route exact path="/results" component={Results} /> */}
                <Route component={NoMatch} />
              </Switch>
            </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
