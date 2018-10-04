import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Form from './Form';

export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value.trim(), 
          password = e.target.password.value.trim();

    this.props
        .loginWithPassword(email, password)
        .then(() => this.setState({error: ''}))
        .catch(error => this.setState({error}));
  }
  render() {
    return (
      <Form title="Log IN" error={this.state.error} onSubmit={this.onSubmit} btnTxt="LogIn" lnkTo="/sign-up" 
            lnkTxt="Need an account?" />
    );
  }
}

LogIn.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default withTracker(props => ({
  loginWithPassword: (email, password) => new Promise((resolve, reject) => {
    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        reject(err.reason);
      }
      resolve('');
    });
  })
}))(LogIn);