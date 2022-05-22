import React, { Component } from 'react';
import UserService from '../services/user';
import Swal from 'sweetalert2';
import '../Styles/Login.css';

type Props = {};
type State = {
  email: string;
  password: string;
};
export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const {email, password} = this.state

    UserService.login(email, password)
      .then((res): any => {
        const {data} = res;
        if (data.error) {
          return Swal.fire({
            title: 'Error',
            text: 'Invalid login details'
          })
        }
        else if (data.access_token) {
          const {access_token, refresh_token} = data;
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          return Swal.fire({
            title: 'Success',
            text: 'You are now logged in! You will be redirected to the homepage'
          })
          .then(() => {
            window.location.href = '/home'
          })
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Please try again later'
          })
        }
      })
  }
  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({email: e.target.value})
  }
  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }
  render() {
    return (
      <div className='allLoginContent' style={{backgroundColor: '#1D1D1D'}}>

          <form action="" className='form' onSubmit={this.handleSubmit}>
            <h1 style={{color: '#FFFFFF', marginTop: 0, paddingTop: 20}}>Log in</h1>
          <div className='emailSection'>
            
          <label htmlFor="email" className="loginLabel">Email</label>
          <input type="text" className='input' value={this.state.email} onChange={this.handleChangeEmail} id="loginEmailInput"/>
          </div>

          <div className='passwordSection'>
          <label htmlFor="password" className="loginLabel">Password</label>
          <input type="password" className='input' onChange={this.handleChangePassword} id="loginPasswordInput"/>
          </div>

          <button className='loginButton' id="loginNowButton">Log in</button>
          </form>
      </div>
    )
  }
}
