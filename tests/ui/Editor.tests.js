import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {Editor} from '../../imports/ui/Editor';

if (Meteor.isClient) {
  let clock;
  describe('Editor', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('if no note selected show pick note text', () => {
      const wrapper = mount(<Editor save={() => {}} remove={() => {}} />);
      const text = wrapper.find('p').text();

      expect(text).to.equal('Pick or create a note to get started.');
    });

    it('if no note found show no note found text', () => {
      const wrapper = mount(<Editor save={() => {}} remove={() => {}} selected="123" />);
      const text = wrapper.find('p').text();

      expect(text).to.equal('No note found.');
    });

    it('if note passed as props should not show no note found text', () => {
      const wrapper = mount(<Editor save={() => {}} remove={() => {}} selected="123" note={{}} />);
      const length = wrapper.find('p').length;

      expect(length).to.equal(0);
    });

    it('if note passed as props should be equal to state note initially', () => {
      const note = {
        _id: '1234',
        title: 'Title',
        body: 'Body'
      };
      const wrapper = mount(
        <Editor save={() => {}} remove={() => {}} selected="123" note={note} />
      );
      expect(wrapper.instance().state.note).to.equal(note);
    });

    it('if note change should reflect state note change', () => {
      const note = {
        _id: '1234',
        title: 'Title',
        body: 'Body'
      };
      const title = 'Title New', body = 'Body New';
      const wrapper = mount(
        <Editor save={() => {}} remove={() => {}} selected="123" note={note} />
      );
      wrapper.instance().clearTimer = () => {};
      wrapper.instance().setTimer = () => {};
      wrapper.find('input').simulate('change', { target: {value: title} });
      wrapper.find('textarea').simulate('change', { target: {value: body} });
      wrapper.update();

      expect(wrapper.instance().state.note.title).to.equal(title);
      expect(wrapper.instance().state.note.body).to.equal(body);
    });

    it('it should call save method after 2 seconds of delay & match with new value', (done) => {
      const note = {
        _id: '1234',
        title: 'Title',
        body: 'Body'
      }, title = 'Title New', body = 'Body New', save = sinon.spy((id, n) => {
        expect(id).to.eql(note._id);
        expect(n.title).to.eql(title);
        expect(n.body).to.eql(body);
        done();
      });
      const wrapper = mount(
        <Editor save={save} remove={() => {}} selected="123" note={note} />
      );
      wrapper.find('input').simulate('change', { target: {value: title} });
      wrapper.find('textarea').simulate('change', { target: {value: body} });
      wrapper.update();
      clock.tick(2000);
    });

    it('it should call remove method with id', () => {
      const note = {
        _id: '1234',
        title: 'Title',
        body: 'Body'
      }, spy = sinon.spy();
      const wrapper = mount(
        <Editor save={() => {}} remove={spy} selected="123" note={note} />
      );
      wrapper.find('button').simulate('click');
      wrapper.update();

      expect(spy.called).to.eql(true);
      expect(spy.args[0][0]).to.eql(note._id);
    });

    it('it should set state for new note', () => {
      const note = {
        _id: '1234',
        title: 'Title',
        body: 'Body'
      }, selected = note._id;
      const wrapper = mount(
        <Editor save={() => {}} remove={() => {}} />
      );
      wrapper.setProps({ note, selected });
      wrapper.update();
      expect(wrapper.instance().state.note).to.equal(note);
      expect(wrapper.instance().state.selected).to.equal(selected);
    });
  });
  
}