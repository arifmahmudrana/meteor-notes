import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Session } from "meteor/session";
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = ({title, navOpen, navOpenImage, onClick}) => (
  <div className="header">
    <div className="wrapper header--container">
      <img className="header__nav-toggle" src={navOpenImage} alt="Menu" onClick={onClick} />
      <h1 className="header--title">
        <Link to="/home" className="header--link hover">
          {title}
        </Link>
      </h1>
      <Link to="/log-out" className="header--link hover">Log Out</Link>
    </div>
  </div>
);

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navOpen: PropTypes.bool.isRequired,
  navOpenImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withTracker(props => ({
  title: props.title,
  navOpen: Session.get('navOpen'),
  navOpenImage: Session.get('navOpen') ? '/images/x.svg' : '/images/bars.svg',
  onClick: () => Session.set('navOpen', !Session.get('navOpen')),
}))(PrivateHeader);