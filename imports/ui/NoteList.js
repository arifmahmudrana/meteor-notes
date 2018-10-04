import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import Notes from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => (
  <div className="item-list">
    <NoteListHeader />
    { 
      props.notes.length 
      ? props.notes.map(i => <NoteListItem key={i._id} note={i} selected={props.selected} />) 
      : <NoteListEmptyItem /> 
    }
  </div>
);

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  selected: PropTypes.string
};

export default withTracker(props => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch()
  };
})(NoteList);