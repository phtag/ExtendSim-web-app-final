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

// function App() 
class App extends React.Component {
  state = {
    username: "",
    password: "",
    userSessionID: "",
  };
  componentDidMount () {
  };

  handleLoginOnSubmitEvent = () => {
    alert('Submitting login data. Username=' + this.state.username + " password=" + this.state.password);
    API.login(this.state)
    .then(res => console.log("handleLoginOnSubmitEvent response=" + res.userSessionID))
    // .then(res => this.setState({ userSessionID: res.userSessionID}))
    // .then(res => localStorage.setItem('current_user_token', res.data.token))
    .catch(err => console.log("handleLoginOnSubmitEvent error=" + err));
  }

  handleOnChangeEvents = key => e => this.setState({ [key]: e.target.value });

  render () {
    return (
      <Router>
        <CounterProvider>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/login" render={
                (handleLoginOnSubmitEvent, handleOnChangeEvents) => (
                <Login {...this} />)} />
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
}

export default App;
