import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Signup extends React.Component {  
    state = {
        username: "",
        password: "",
        reenteredpassword: "",
        activationkey: "",
        error: "",
        validInputs: false
    }
      
    componentDidMount () {
    };

    resetLoginPage = () => {
        this.setState({
                      username: "",
                      password: "",
                      reenteredpassword: "",
                      activationkey: ""}, this.validateUserInputs);
    }
    
    validateUserInputs = () => {
        const { username, password, reenteredpassword } = this.state;
        if (username != "") {
            if (password != "") {
                if (reenteredpassword != "") {
                    if (password === reenteredpassword) {
                        this.setState({ validInputs: true });
                    }               
                }
            }
        } else {
            this.setState({ validInputs: false });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        }, this.validateUserInputs);        
    }

    handleSignupSubmit = (event) => {
        const { history} = this.props;
        event.preventDefault();
        const { username, password } = this.state;
        API.signup(this.state)
        .then(res => {
            history.push('/login');
        })
        .catch(err => {
            this.setState({ error: err.response.data.msg }, this.resetSignupPage);
        })
    }
    render() {
        return (
        <div id="home">
            <div className="container">
                <div className="row">
                    <header id="ExtendSim-header">
                    </header>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h2>ExtendSim ASP signup page</h2>
                        <form className="clearfix mb-4" action="POST">
                            <div className="form-group">
                                <label htmlFor="username-text">Username</label>
                                <input 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    type="text" 
                                    id="username-text" 
                                    name="username"
                                    value={this.username}
                                    className="form-control" 
                                    aria-describedby="example-text" 
                                    placeholder="Enter username">
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activationkey-text">Activation key</label>
                                <input 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    type="text" 
                                    id="activationkey-text" 
                                    name="activationkey"
                                    value={this.activationkey}
                                    className="form-control" 
                                    aria-describedby="example-text" 
                                    placeholder="Enter username">
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-text">Password</label>
                                <input 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    type="password" 
                                    value={this.password}
                                    id="password-text" 
                                    name="password"
                                    className="form-control" 
                                    aria-describedby="password-text">
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeat-password-text">Re-enter password</label>
                                <input 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    type="password"
                                    value={this.reenteredpassword} 
                                    id="repeat-password-text" 
                                    name="reenteredpassword"
                                    className="form-control" 
                                    aria-describedby="password-text">
                                </input>
                            </div>
                            <button 
                                onClick={this.handleSignupSubmit} // Must pass router history to parent so that it can redirect to another page
                                disabled={!this.state.validInputs}
                                id="submit-login-info" 
                                className="btn btn-primary float-left">
                                Submit
                            </button>
                            <br></br>
                            { this.error && (
                            <div className="login-errors">
                                <h3>{this.error}</h3>
                            </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    }
export default Signup;
