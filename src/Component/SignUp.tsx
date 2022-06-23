/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import UserService from '../services/user';
import '../Styles/SignUp.css';

type Props = {};
type State = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: number;
    username: string;
};

export default class SignUp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobileNumber: 0,
      username: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMobileNumner = this.handleChangeMobileNumner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      firstName, lastName, email, password, mobileNumber, username,
    } = this.state;

    UserService.signUp(firstName, lastName, email, password, mobileNumber, username)
      .then((res): any => {
        const { data } = res;
        if (data.error) {
          return Swal.fire({
            title: 'Error',
            text: data.error,
          });
        }
        if (data._id) {
          return Swal.fire({
            title: 'Success',
            text: 'Account created! You will now be redirected to log in!',
          })
            .then(() => {
              window.location.href = '/';
            });
        }

        return Swal.fire({
          title: 'Error',
          text: 'Please try again later',
        });
      });
  }

  handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
  };

  handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
  };

  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };

  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  };

  handleChangeMobileNumner = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ mobileNumber: +e.target.value });
  };

  handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };

  render() {
    const { firstName, email, mobileNumber } = this.state;
    return (
      <div className="allSignUpContent" style={{ backgroundColor: '#1D1D1D' }}>
        <form action="" className="signUpForm" onSubmit={this.handleSubmit}>
          <h1 style={{ color: '#FFFFFF', marginTop: 0, paddingTop: 20 }}>Sign Up</h1>
          <div className="firstNameSection">

            <label htmlFor="firstName" className="signUpLabel">First Name</label>
            <input type="text" className="input" value={firstName} onChange={this.handleChangeFirstName} />
          </div>

          <div className="lastNameSection">
            <label htmlFor="lastName" className="signUpLabel">Last Name</label>
            <input type="text" className="input" onChange={this.handleChangeLastName} />
          </div>

          <div className="emailSection">

            <label htmlFor="email" className="signUpLabel">Email</label>
            <input type="text" className="input" value={email} onChange={this.handleChangeEmail} />
          </div>

          <div className="passwordSection">
            <label htmlFor="password" className="signUpLabel">Password</label>
            <input type="password" className="input" onChange={this.handleChangePassword} />
          </div>

          <div className="mobileNumberSection">

            <label htmlFor="mobileNumber" className="signUpLabel">Mobile Number</label>
            <input type="number" className="input" value={mobileNumber} onChange={this.handleChangeMobileNumner} />
          </div>

          <div className="usernameSection">
            <label htmlFor="username" className="signUpLabel">Username</label>
            <input type="text" className="input" onChange={this.handleChangeUsername} />
          </div>

          <button className="signInButton" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
