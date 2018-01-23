import { Component } from 'react';
import axios from 'axios'
//import {Link} from 'react-router-dom';
import 'carbon-components/css/carbon-components.css';
//import {Button,Footer,Form,TextInput} from 'carbon-components-react';
import './main.css';

class Signin extends Component {
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
      console.log("inside signin");
      axios.post('/signin', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        if(response.data == 'success'){
          window.location.assign('http://localhost:3000/home')
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
          <Form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <TextInput
              className="form-control"
              id="inputEmail"
              labelText = "Email"
              placeholder="Email Address"
              onChange={this.handleEmailChange}
            />
            <TextInput
              type="password"
              required
              className="form-control"
              id="inputPassword"
              labelText = "Password"
              placeholder = "Password"
              onChange={this.handlePasswordChange}
            />
            <Button className="btn-sign" onClick={this.signIn} type="button">Sign in</Button>
          </Form>

          <div>
          <Footer className="some-class">
            Not registered with us ?  <Link to="/signup">{'Signup'}</Link>
          </Footer>
          </div>          


          
        </div>

      )
    }
}

class Signup extends Component{
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
       
            <TextInput
              className="form-control"
              id="inputName"
              labelText="Name"
              placeholder="Enter Full Name Here"
              onChange={this.handleEmailChange}
            />
            <TextInput
              className="form-control"
              id="inputEmail"
              labelText="Email"
              placeholder="Enter Email Address Here"
              onChange={this.handleEmailChange}
            />
            <TextInput
              type="password"
              required
              className="form-control"
              id="inputPassword"
              labelText="Password"
              onChange={this.handlePasswordChange}
            />


            <Button className="btn-sign" onClick={this.signUp} type="submit">Sign up</Button>
          </form>
          <div>
          <div>
          <Footer className="some-class">
            Already Registered ? Get back to Login page   <Link to="/">{'Signin'}</Link>
          </Footer>
          </div>  
            <Link to="/">{'Signin'}</Link>
          </div>
         
        
        
        </div>

        

        
        
      )
    }
}

//export default Signin;

export {
    Signin,
    Signup,
  }
  

// ReactDOM.render(
//     <Router history={hashHistory}>
//         <Route component={Signin} path="/"></Route>
//         <Route component={Signup} path="/signup"></Route>
//     </Router>,
// document.getElementById('app'));