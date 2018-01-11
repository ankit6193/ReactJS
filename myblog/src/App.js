import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'carbon-components/css/carbon-components.css'
import {Form, TextInput,Button} from 'carbon-components-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
          

          <Form className="form-class">
              <TextInput
                className="login-class"
                id="login"
                labelText="Login"
                placeholder="Your Email ID"
              />

              <TextInput
                type="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                className="password-class"
                id="pass"
                labelText="Password"
                invalid
                invalidText="Your password must be at least 6 characters as wel…"
              />

              <Button type="submit" className="some-class">
              Submit
              </Button>
          </Form>
        
      </div>
    );
  }
}

export default App;
