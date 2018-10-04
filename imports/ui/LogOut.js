import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

const LogOut = () => {
  Meteor.logout();

  return (
    <Redirect to="/" push />
  );
};

export default LogOut;