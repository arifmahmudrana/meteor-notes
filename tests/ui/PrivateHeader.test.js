import { Meteor } from 'meteor/meteor';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import PrivateHeader from './../../imports/ui/PrivateHeader';
import { Link } from 'react-router-dom';


if (Meteor.isClient) {

  describe('PrivateHeader', () => {
    it('should set anchor text to logout', () => {
      const wrapper = mount((
        <StaticRouter context={{}}>
          <PrivateHeader title="Dashboard" />
        </StaticRouter>
      ));
      const text = wrapper.find(Link).last().text();

      expect(text).to.equal('Log Out');
    });

    it('title should be set by props title', () => {
      const title = 'Dashboard';
      const wrapper = mount((
        <StaticRouter context={{}}>
          <PrivateHeader title={title} />
        </StaticRouter>
      ));

      const text = wrapper.find('h1').text();

      expect(text).to.equal(title);
    });
  });
  
}