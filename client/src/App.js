import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Scenarios from './pages/Scenarios';
import Results from './pages/Results';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import { CounterProvider } from './context';

const initialState = { currentUser: {} };
const UserContext = React.createContext(initialState);

function App() {
  return (
    <Router>
      <CounterProvider>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/scenarios" component={Scenarios} />
            <Route exact path="/results" component={Results} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </CounterProvider>
    </Router>
  );
}

export default App;
