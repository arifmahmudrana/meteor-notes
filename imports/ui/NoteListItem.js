import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const NoteListItem = (props) => (
  <div className={'item' + (props.selected === props.note._id ? ' item--selected' : '')}>
    <h5 className="item__title">      
      <Link to={`/home/${props.note._id}`}>
        {props.note.title || 'Untitled Note'}
      </Link>
    </h5>
    <p className="item__subtitle">{moment(props.note.updatedAt).fromNow()}</p>
  </div>
);

NoteListItem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    updatedAt: PropTypes.number.isRequired,
  }),
  selected: PropTypes.string
};

export default NoteListItem;