import React, { Component } from 'react';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
import './login.css';

import 'carbon-components/css/carbon-components.css'
import {Footer,TextInput,Button} from 'carbon-components-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        email:'',
        password:''
      };
    }
    signIn(){
      var self = this;
      axios.post('/signin', {
        email: self.state.email,
        password: self.state.password
      })
      .then(function (response) {
        if(response.data == 'success'){
          self.props.history.push("/edit");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    render() {
      return (
        <div>
          <MuiThemeProvider>
                <AppBar 
                 title="React Blog App"
                 iconElementRight={<FlatButton href = "/home" label="Home" />}
                />
          </MuiThemeProvider>
          <h2>Please Sign In </h2>
          <form className="form-signin">
          <TextInput
            onChange={this.handleEmailChange}
            className="some-class"
            id="test2"
            labelText="Email"
            placeholder="Email"
          />
          <TextInput
            onChange={this.handlePasswordChange}
            type="password"
            required
            className="some-class"
            id="test2"
            labelText="Password"
          />
            
            <Button onClick={this.signIn} className="some-class">
            Login
            </Button>
           </form>

          <div>
            <Footer className="some-class">
                    <div className="left--footer">
                      &copy; 2018 Ankit, Inc.
                    </div>
                    <div className="right--footer">
                      Not Registered with us ?  <Link to="/signup">{'Signup'}</Link>
                    </div>
            </Footer>
            </div>
        </div>

      )
    }
}

export default withRouter(SignIn);