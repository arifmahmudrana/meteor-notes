import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../imports/startup/simple-schema';
import routes from '../imports/routes';
import { Tracker } from 'meteor/tracker';

Tracker.autorun(() => {
  document.body.classList.toggle('nav-open', Session.get('navOpen'));
});

Meteor.startup(() => {
  Session.set('navOpen', false);

  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});