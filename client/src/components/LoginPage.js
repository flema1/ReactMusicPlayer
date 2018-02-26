import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class Login extends Component {
  componentDidMount() {
    // document.body.scrollTop = 0;
    // document.querySelector('.menu').classList.remove('open');
    //his.props.loginUser('hi');
  }
  render() {
    return (
      <div id="login-container">
        <div id="form-container">
          <h3 className="loginHeading text-center">Login with your Google Music account</h3>
          <LoginForm authenticate={this.props.authenticate }/>
        </div>
      </div>
    )
  }
}


