import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import history from '../libs/history';

export const NoteListHeader = ({onClick}) => (
  <div className="item-list__header">
    <button className="button" type="button" onClick={onClick}>Create New</button>
  </div>
);

NoteListHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default withTracker(props => {
  return {
    onClick() {
      Meteor.call('notes.insert', {}, (e, id) => {
        if (!e) {
          history.push(`/home/${id}`)
        }
      });
    }
  };
})(NoteListHeader);