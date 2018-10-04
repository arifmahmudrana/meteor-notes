import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Form from './Form';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: ''
    };
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value.trim(), 
          password = e.target.password.value.trim();

    this.props
        .createUser(email, password)
        .then(() => this.setState({error: ''}))
        .catch(error => this.setState({error}));
  }
  render() {
    return (
      <Form title="Sign Up" error={this.state.error} onSubmit={this.onSubmit} btnTxt="Create Account" lnkTo="/" 
            lnkTxt="Have an account?" />
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(props => ({
  createUser: (email, password) => new Promise((resolve, reject) => {
    Accounts.createUser({email, password}, (err) => {
      if (err) {
        reject(err.reason);
      }
      resolve('');
    })      
  })
}))(SignUp);