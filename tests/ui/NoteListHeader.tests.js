import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {NoteListHeader} from '../../imports/ui/NoteListHeader';

if (Meteor.isClient) {

  describe('NoteListHeader', () => {
    it('should call onClick method on button click', () => {
      const spy = sinon.spy();
      const wrapper = mount(<NoteListHeader onClick={spy} />);
      wrapper.find('button').simulate('click');
      expect(spy.called).to.be.true;
    });
  });
  
}