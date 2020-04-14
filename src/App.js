import React, { Component } from 'react';
import InputField from './components/InputField';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: '',
      usernameErr: '',
      emailErr: '',
      passwordErr: '',
      repasswordErr: '',
    };
    this.validateUsername = this.validateUsername.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateRePassword = this.validateRePassword.bind(this);
  }

  validateUsername(value) {
    let valid = true;
    let errorMessage = null;
    if (!value){
      valid = false;
      errorMessage = 'Username is required';
    }
    else if (value.length > 15) {
      valid = false;
      errorMessage = 'Username cannot be longer than 15 characters';
    }
    this.setState({
      username: value,
      usernameErr: errorMessage
    });
    return valid;
  }

  validateEmail(value) {
    const rx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    let valid = true;
    let errorMessage = null;
    if (!value){
      valid = false;
      errorMessage = 'Email is required';
    } else if (!rx.test(value)) {
      valid = false;
      errorMessage = 'Please enter a valid email';
    }
    this.setState({
      email: value,
      emailErr: errorMessage
    });
    return valid;
  }

  validatePassword(value) {
    let valid = true;
    let errorMessage = null;
    const { repassword } = this.state;
    if (!value){
      valid = false;
      errorMessage = 'Password is required';
    }
    this.setState({
      password: value,
      passwordErr: errorMessage
    }, () => {
      this.validateRePassword(repassword);
    });
    return valid;
  }

  validateRePassword(value) {
    let valid = true;
    let errorMessage = null;
    const { password } = this.state;
    if (password != value){
      valid = false;
      errorMessage = 'This password doesn\'t match. Try again.';
    }
    this.setState({
      repassword: value,
      repasswordErr: errorMessage
    });
    return valid;
  }

  isFormValid() {
    const { username, email, password, repassword } = this.state;
    const { usernameErr, emailErr, passwordErr, repasswordErr } = this.state;
    return username && email && password && repassword && !usernameErr && !emailErr && !passwordErr && !repasswordErr;
  }

  render() {
    const { usernameErr, emailErr, passwordErr, repasswordErr } = this.state;
    return (
      <div className="signup-form mx-auto my-5 p-5">
        <h1 className="mb-5">Signup Form</h1>
        <form>
          <InputField
            type="text"
            label="Username"
            validate={this.validateUsername}
            errorMessage= { usernameErr }
          />
          <InputField
            type="email"
            label="Email"
            validate={this.validateEmail}
            errorMessage= { emailErr }
          />
          <InputField
            type="password"
            label="Password"
            validate={this.validatePassword}
            errorMessage= { passwordErr }
          />
          <InputField
            type="password"
            label="Confirm Password"
            validate={this.validateRePassword}
            errorMessage= { repasswordErr }
          />
        </form>
        <button disabled={ !this.isFormValid() } className="btn btn-danger submit-button">Submit</button>
      </div>
    )
  }
}

export default App;
