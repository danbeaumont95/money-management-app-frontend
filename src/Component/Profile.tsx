/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    UserService.getMyDetails(accessToken)
      .then((res) => {
        if (res.data.firstName) {
          this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            password: res.data.password,
            mobileNumber: res.data.mobileNumber,
            username: res.data.username,
            loading: false,
          });
        } else {
          this.setState({ firstName: 'Dan' });
        }
      });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      // eslint-disable-next-line no-unused-vars
      firstName, lastName, email, password, mobileNumber, username,
    } = this.state;
  }

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

          <div>
            <label htmlFor="firstName" className="updateDetailsLabel">First Name</label>
            <input type="text" value={firstName} />
          </div>

          <div>
            <label htmlFor="lastName" className="updateDetailsLabel">First Name</label>
            <input type="text" value={lastName} />
          </div>

          <div>
            <label htmlFor="email" className="updateDetailsLabel">Email</label>
            <input type="text" value={email} />
          </div>

          <div>
            <label htmlFor="mobileNumber" className="updateDetailsLabel">Mobile Number</label>
            <input type="number" value={mobileNumber} />
          </div>

          <div>
            <label htmlFor="username" className="updateDetailsLabel">Username</label>
            <input type="text" value={username} />
          </div>

          <div>
            <label htmlFor="password" className="updateDetailsLabel">Password</label>
            <input type="password" value={password} />
          </div>

          <button className="changeDetailsButton" type="submit">Update Details</button>

        </form>
      </div>
    );
  }
}
