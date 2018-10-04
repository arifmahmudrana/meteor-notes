import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'chai';
import faker from 'faker';
import moment from 'moment';
import Notes from '../../imports/api/notes';

if (Meteor.isServer) {
  describe('Notes collection testing', () => {
    describe('Notes collection methods testing', () => {
      const userId = Random.id();
      let noteId;
      const note = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        updatedAt: moment(faker.date.past()).valueOf()
      };

      // Set up a fake method invocation that looks like what the method expects
      const invocation = { userId };

      beforeEach(() => {
        Notes.remove({});
      });

      it('user can create note', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];

        // Run the method with `this` set to the fake invocation
        noteId = notesInsert.apply(invocation, [note]);
        const noteRow = Notes.findOne({ _id: noteId, owner: userId });

        // Verify that the method does what we expected
        expect({_id: noteId,...note, owner: userId}).to.include(noteRow);
        expect(() => notesInsert.apply(invocation, [note])).to.not.throw();
      });

      it(`unauthorized user can't create note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        // Verify that the method does what we expected
        expect(() => Meteor.server.method_handlers['notes.insert']()).to.throw();
      });

      it(`user can delete note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];
        const notesRemove = Meteor.server.method_handlers['notes.remove'];
        
        // Run the method with `this` set to the fake invocation
        //add note first
        noteId = notesInsert.apply(invocation, [note]);
        notesRemove.apply(invocation, [noteId]);

        const noteRow = Notes.findOne({ _id: noteId, owner: userId });
        expect(noteRow).to.be.undefined;
      });

      it(`unauthorized user can't delete note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        // Verify that the method does what we expected
        expect(() => Meteor.server.method_handlers['notes.remove']()).to.throw();
      });

      it(`an user can only remove his own note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];
        const notesRemove = Meteor.server.method_handlers['notes.remove'];
        
        // Run the method with `this` set to the fake invocation
        //add note first
        noteId = notesInsert.apply(invocation, [note]);
        notesRemove.apply({ userId: Random.id() }, [noteId]);

        const noteRow = Notes.findOne({ _id: noteId, owner: userId });
        expect(noteRow).to.not.be.undefined;
      });

      it(`user can update note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];
        const notesUpdate = Meteor.server.method_handlers['notes.update'];
        
        // Run the method with `this` set to the fake invocation
        //add note first
        noteId = notesInsert.apply(invocation, [note]);
        const noteUpdate = {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs()
        };
        notesUpdate.apply(invocation, [noteId, noteUpdate]);
        const noteRow = Notes.findOne({ _id: noteId, owner: userId });
        
        expect(noteRow).to.not.be.undefined;
        expect(noteRow).to.include({_id: noteId,...noteUpdate, owner: userId});
      });

      it(`unauthorized user can't update note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        // Verify that the method does what we expected
        expect(() => Meteor.server.method_handlers['notes.update']()).to.throw();
      });
      
      it(`an user can only update his own note`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];
        const notesUpdate = Meteor.server.method_handlers['notes.update'];
        
        // Run the method with `this` set to the fake invocation
        //add note first
        noteId = notesInsert.apply(invocation, [note]);
        const noteUpdate = {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs()
        };
        notesUpdate.apply({ userId: Random.id() }, [noteId, noteUpdate]);
        const noteRow = Notes.findOne({ _id: noteId, owner: userId });
        
        expect(noteRow).to.not.include({_id: noteId,...noteUpdate, owner: userId});
      });

      it(`an user can only see his notes`, () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const notesInsert = Meteor.server.method_handlers['notes.insert'];
        const randomUserId = Random.id();

        // Run the method with `this` set to the fake invocation
        //add note first
        notesInsert.apply(invocation, [note]);
        notesInsert.apply({ userId: randomUserId }, [note]);

        const notes = Meteor.server.publish_handlers.notes.apply({ userId }).fetch();

        expect(notes).to.be.an('array').have.lengthOf(1);
        notes.forEach(i => {
          expect(i).to.include({ owner: userId }).not.include({ owner: randomUserId });
        });
      });

      after(() => {
        Notes.remove({});
      });
    });
  });
}