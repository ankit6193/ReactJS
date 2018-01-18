import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'carbon-components/css/carbon-components.css'
import {Form, TextInput,Button} from 'carbon-components-react'
import axios from 'axios'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = {
      login:" ",
      pass:" ",
      loginmessage:"Logging in "
    };
  } 

  handleEmailChange(e){
      this.setState({login:e.target.value})
  }
  handlePasswordChange(e){
      this.setState({pass:e.target.value})
  }
  
  signIn(e){
    var app = this;
    axios.post('/signin', {
      email: this.state.login,
      password: this.state.pass
    })
    .then(function (response) {
      console.log(response);
      app.setState({loginmessage:"Logged In"})
    })
    .catch(function (error) {
      console.log(error);
      app.setState({loginmessage:"Failed"})
    });       
    e.preventDefault();  
  }
  
  render() {
    return (
      
      <div>
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sign in to your blog</h1>
        </header>
      </div>

      <div className= "Login-div"> 
          <Form className="form-class">
              <TextInput
                className="login-class"
                onChange={this.handleEmailChange}
                id="login"
                labelText="Login"
                placeholder="Your Email ID"
              />

              <TextInput
                type="password"
                onChange={this.handlePasswordChange}
                required
                className="password-class"
                id="pass"
                labelText="Password"
              />
        
              <Button type="submit" className="Button-class" onClick={this.signIn}>
                Sign-In
              </Button>
              {this.state.loginmessage}
          </Form>
      </div>
      </div>
    );
  }
}

export default SignIn;
