import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { matchPath } from 'react-router'
import history from '../libs/history';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import SignUp from '../ui/SignUp';
import App from '../ui/App';
import LogIn from '../ui/LogIn';
import LogOut from '../ui/LogOut';
import NotFound from '../ui/NotFound';

const unAuthenticatedRoutes = ['/', '/sign-up'];
const authenticatedRoutes = ['/home', '/home/:id'];

const matchRoute = (route, path) => matchPath(path, {
  path: route,
  exact: true,
  strict: false
});

Tracker.autorun(() => {
  if (!!Meteor.userId()) {
    unAuthenticatedRoutes.forEach(i => {
      if (matchRoute(i, history.location.pathname)) {
        history.replace('/home');
      }
    });
    return;
  }

  authenticatedRoutes.forEach(i => {
    if (matchRoute(i, history.location.pathname)) {
      history.replace('/');
    }
  });
});

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" component={LogIn} exact />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/home" exact component={App} />
      <Route path="/home/:id" component={App} />
      <Route path="/log-out" component={LogOut} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);