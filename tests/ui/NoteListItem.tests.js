import { Meteor } from 'meteor/meteor';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import NoteListItem from '../../imports/ui/NoteListItem';
import moment from 'moment';

if (Meteor.isClient) {

  describe('NoteListItem', () => {
    it('should show correct title & time', () => {
      const title = 'My custom title';
      const updatedAt = moment().valueOf();
      const updatedAtTitle = moment(updatedAt).fromNow();
      const note = {_id: '', title, body: '', owner: '', updatedAt};

      const wrapper = mount((
        <StaticRouter context={{}}>
          <NoteListItem note={note} />
        </StaticRouter>
      ));
      expect(wrapper.find('h5').text()).to.equal(title);
      expect(wrapper.find('p').text()).to.equal(updatedAtTitle);
    });

    it('should show Untitled Note if no title', () => {
      const title = '';
      const updatedAt = moment().valueOf();
      const note = {_id: '', title, body: '', owner: '', updatedAt};

      const wrapper = mount((
        <StaticRouter context={{}}>
          <NoteListItem note={note} />
        </StaticRouter>
      ));
      expect(wrapper.find('h5').text()).to.equal('Untitled Note');
    });
  });
  
}