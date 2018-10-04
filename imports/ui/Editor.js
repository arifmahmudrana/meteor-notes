import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import history from '../libs/history';
import PropTypes from 'prop-types';
import Notes from '../api/notes';
import { Session } from 'meteor/session';

export class Editor extends Component {
  state = {
    note: undefined,
    selected: undefined,
    removing: false
  }
  constructor(props) {
    super(props);
    this.timerObj = null;
    this.textInput = React.createRef();
    this.onClick = this.onClick.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      note: props.note,
      selected: props.selected
    };
  }
  clearTimer() {
    if (this.timerObj) {
      clearTimeout(this.timerObj);
    }
  }
  onChange(key, e) {
    this.clearTimer();
    const note = this.state.note;
    note[key] = e.target.value;
    this.setState({note});
    this.setTimer(note);
  }
  save({_id, title, body}) {
    this.props.save(_id, {
      title,
      body
    });
  }
  setTimer(note) {
    this.timerObj = setTimeout(() => this.save(note), 2000);
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        note: this.props.note
      });
      this.textInput.current.focus();
    }

    Session.set('navOpen', false);
  }
  componentWillUnmount() {
    this.clearTimer();
    this.save(this.state.note);
  }
  onClick() {
    this.setState({
      removing: true
    }, () => this.props.remove(this.state.note._id));
  }
  render() {
    const {note, selected, removing} = this.state;

    if (note) {
      return (
        <div className="editor">
          <input className="editor__title" 
              onChange={this.onChange.bind(this, 'title')} 
              value={note.title} 
              placeholder="Untitled Note" />
          <textarea className="editor__body" 
              ref={this.textInput} 
              onChange={this.onChange.bind(this, 'body')} 
              placeholder="Your note here" 
              value={note.body}>
          </textarea>
          <div>
            <button className="button button--secondary" 
              type="button" 
              onClick={this.onClick}>
              Delete Note
            </button>
          </div>
        </div>
      );
    } else if (selected && !removing) {      
      return (
        <div className="editor editor__message">
          <p className="error">No note found.</p>
        </div>
      );
    }

    return (
      <div className="editor editor__message">
        <p>Pick or create a note to get started.</p>
      </div>
    );
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selected: PropTypes.string,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default withTracker(props => {
  Meteor.subscribe('notes');

  return {
    note: Notes.findOne(props.selected),
    save: (id, note) => new Promise((resolve, reject) => {
      Meteor.call('notes.update', id, note, (err) => {
        if (err) {
          reject(err.reason);
        }
        resolve('');
      });
    }),
    remove: id => {
      Meteor.call('notes.remove', id, (err) => {
        if (!err) {
          history.replace('/home');
        }
      });
    }
  };
})(Editor);