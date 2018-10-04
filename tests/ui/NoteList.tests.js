import { Meteor } from 'meteor/meteor';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { expect } from 'chai';

import NoteListItem from '../../imports/ui/NoteListItem';
import {NoteList} from '../../imports/ui/NoteList';
import NoteListEmptyItem from '../../imports/ui/NoteListEmptyItem';

if (Meteor.isClient) {

  describe('NoteList', () => {
    it('should have two instances of `NoteListItem`', () => {
      const notes = [
        {_id: '1', title: '', body: '', owner: '', updatedAt: 1234567},
        {_id: '2', title: '', body: '', owner: '', updatedAt: 1234567},
      ];

      const wrapper = mount((
        <StaticRouter context={{}}>
          <NoteList notes={notes} />
        </StaticRouter>
      ));
      expect(wrapper.find(NoteListItem).length).to.equal(notes.length);
      expect(wrapper.find(NoteListEmptyItem).length).to.equal(0);
    });

    it('should show `NoteListEmptyItem` if no notes', () => {
      const notes = [];
      
      const wrapper = mount((
        <StaticRouter context={{}}>
          <NoteList notes={notes} />
        </StaticRouter>
      ));
      expect(wrapper.find(NoteListItem).length).to.equal(0);
      expect(wrapper.find(NoteListEmptyItem).length).to.equal(1);
    });
  });
  
}