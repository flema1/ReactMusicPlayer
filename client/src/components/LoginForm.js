import React, { Component } from 'react';
import { connect } from 'react-redux';

const login = (email,password) => {
  return {
    type: 'LOGIN',
    email:email,
    password:password
  };
};


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e){
    this.setState({email: e.target.value},()=> console.log(this.state.email, "email"));
   
  }

  onChangePassword(e){
    this.setState({password: e.target.value},  ()=>console.log(this.state.password, "password"));
   
  }

   onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
     let {email, password} = this.state;
     let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form clasName= 'loginForm' name="loginForm" /*onSubmit={this.onSubmit}*/>
        <div className="form-group-collection">
         
        <img src={' https://www.shareicon.net/data/512x512/2016/09/21/832421_sound_512x512.png'} alt="boohoo" className="img-responsive"/>

          <div className="form-group">
            {/*<label>Email:</label>*/}
            <input className='login-form'type="email" name="email" placeholder='Email' onChange={this.onChangeEmail.bind(this) } value={this.state.email} />
          </div>
          <div className="form-group">
            {/*<label>Password:</label>*/}
            <input className='login-form' type="password" name="password" placeholder='Password' onChange={this.onChangePassword.bind(this) } value={this.state.password} />
          </div>
            <button className="loginBtn" onClick={this.onSubmit.bind(this)}>login</button>
        </div>
        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Success.</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.auth.isLoginPending,
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.loginError
  };
}



const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
