/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import '../Styles/Main.css';

type Props = {};
type State = {
  showLogin: boolean;
  showSignUp: boolean
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLogin: true,
      showSignUp: true,
    };
  }

  handleLoginClick = () => {
    this.setState({ showLogin: true, showSignUp: false });
  };

  handleSignupClick = () => {
    this.setState({ showSignUp: true, showLogin: false });
  };

  render() {
    const { showLogin } = this.state;

    return (
      <div style={{ backgroundColor: '#1D1D1D' }}>
        <h1 style={{ color: '#FFFFFF', marginTop: 0, paddingTop: 20 }}>Money Management App</h1>
        <button onClick={this.handleLoginClick} className="loginButton" id="loginButton" type="button">Login</button>
        <button onClick={this.handleSignupClick} className="signUpButton" type="button">Sign Up</button>
        {showLogin ? (
          <div>
            <Login />
          </div>
        )
          : (
            <div>
              <SignUp />
            </div>
          )}

      </div>
    );
  }
}
export default Main;
