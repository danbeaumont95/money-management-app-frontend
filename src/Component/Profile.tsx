/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Swal from 'sweetalert2';
import UserService from '../services/user';
import NavBar from './NavBar';
import '../Styles/Profile.css';

type Props = {}

type State = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: number;
  username: string;
  loading: boolean;
}

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobileNumber: 0,
      username: '',
      loading: true,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMobileNumber = this.handleChangeMobileNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    UserService.getMyDetails(accessToken)
      .then((res) => {
        if (res.data.firstName) {
          const {
            firstName, lastName, email, password, mobileNumber, username,
          } = res.data;

          this.setState({
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            username,
            loading: false,
          });
        } else {
          this.setState({ firstName: 'Dan' });
        }
      });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const accessToken: any = localStorage.getItem('accessToken');

    e.preventDefault();
    const {
      // eslint-disable-next-line no-unused-vars
      firstName, lastName, email, password, mobileNumber, username,
    } = this.state;
    UserService.updateMyDetails(
      accessToken,
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      username,
    ).then((res) => {
      console.log(res, 'res');
      if (res.data.message) {
        return Swal.fire({
          title: 'Success!',
          text: 'Details updated!',
        });
      }

      return Swal.fire({
        title: 'Error!',
        text: 'Unable to update details, please try again later!',
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

  handleChangeMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ mobileNumber: +e.target.value });
  };

  handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };

  render() {
    const {
      firstName, lastName, email, password, mobileNumber, username, loading,
    } = this.state;

    if (loading) {
      return (
        <div>
          <PacmanLoader color="#36D7B7" loading={loading} size={15} />
          <br />
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <div className="allProfileContent">
        <NavBar />
        <h2>Profile</h2>
        <form action="" className="updateDetailsForm" onSubmit={this.handleSubmit}>

          <div className="detailsSection">
            <label htmlFor="firstName" className="updateDetailsLabel">First Name</label>
            <input className="detailsInput" name="firstName" type="text" value={firstName} onChange={this.handleChangeFirstName} />
          </div>

          <div className="detailsSection">
            <label htmlFor="lastName" className="updateDetailsLabel">Last Name</label>
            <input className="detailsInput" name="lastName" type="text" value={lastName} onChange={this.handleChangeLastName} />
          </div>

          <div className="detailsSection">
            <label htmlFor="email" className="updateDetailsLabel">Email</label>
            <input className="detailsInput" name="email" type="text" value={email} onChange={this.handleChangeEmail} />
          </div>

          <div className="detailsSection">
            <label htmlFor="mobileNumber" className="updateDetailsLabel">Mobile Number</label>
            <input className="detailsInput" name="mobileNumber" type="number" value={mobileNumber} onChange={this.handleChangeMobileNumber} />
          </div>

          <div className="detailsSection">
            <label htmlFor="username" className="updateDetailsLabel">Username</label>
            <input className="detailsInput" name="username" type="text" value={username} onChange={this.handleChangeUsername} />
          </div>

          <div className="detailsSection">
            <label htmlFor="password" className="updateDetailsLabel">Password</label>
            <input className="detailsInput" name="password" type="password" value={password} onChange={this.handleChangePassword} />
          </div>

          <button className="changeDetailsButton" type="submit">Update Details</button>

        </form>
      </div>
    );
  }
}
