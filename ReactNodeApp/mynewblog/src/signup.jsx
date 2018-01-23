import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import './signup.css';

import 'carbon-components/css/carbon-components.css'
import {Footer,TextInput,Button} from 'carbon-components-react'

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    
    
        this.state = {
          name:'',
          email:'',
          password:''
        };
      }
      signUp(){
        axios.post('/signup', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
      handleNameChange(e){
        this.setState({name:e.target.value})
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
              <form className="form-signin">
                <h2 className="form-signin-heading">Please sign up</h2>
                <label for="inputName" className="sr-only">Name</label>
                <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autofocus />
                <label for="inputEmail" className="sr-only">Email address</label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                <label for="inputPassword" className="sr-only">Password</label>
                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                
                <Button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="submit">Sign up</Button>
              </form>
              <div>
                <Link to="/login">{'Signin'}</Link>
              </div>
            </div>
            
          )
        }
}

export default SignUp;