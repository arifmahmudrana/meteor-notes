import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({owner: this.userId});
  });
}

Meteor.methods({
  'notes.insert'(note = {}) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    note = {title: '', body: '', updatedAt: moment().valueOf(), ...note};
    return Notes.insert({
      ...note,
      owner: this.userId
    });
  },
  'notes.update'(_id = '', note = {}) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    note = {...note, updatedAt: moment().valueOf()};

    return Notes.update({
      _id,
      owner: this.userId
    }, {$set: note});
  },
  'notes.remove'(_id = '') {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    return Notes.remove({
      _id,
      owner: this.userId
    });
  }
});

export default Notes;