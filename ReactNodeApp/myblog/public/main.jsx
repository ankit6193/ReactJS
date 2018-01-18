class Signin extends React.Component{
    render(){
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