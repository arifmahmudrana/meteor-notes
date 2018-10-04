import { Meteor } from 'meteor/meteor';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {SignUp} from '../../imports/ui/SignUp';

if (Meteor.isClient) {

  describe('SignUp', () => {
    it('should show error messages if error occurs & no error if no errors', () => {
      const error = 'My custom error message';
      const wrapper = mount((
        <StaticRouter context={{}}>
          <SignUp createUser={() => {}} />
        </StaticRouter>
      ));
      wrapper.find(SignUp).instance().setState({ error });
      wrapper.update();
      const text = wrapper.find('p').text();

      expect(text).to.equal(error);

      wrapper.find(SignUp).instance().setState({ error: '' });
      wrapper.update();
      const length = wrapper.find('p').length;

      expect(length).to.equal(0);
    });

    it('should call createUser with the form data', (done) => {
      const email = 'john@example.com';
      const password = '1234';

      const spy = sinon.spy((...args) => {
        // try {
        //   expect(args).to.eql([email, password]);
        // } catch (err) {
        //   done(err);
        // }
        // done();

        return new Promise((resolve, reject) => {
          try {
            expect(args).to.eql([email, password]);
          } catch (err) {
            done(err);
            reject(err);
          }
          done();
          resolve('');
        });
      });

      const wrapper = mount((
        <StaticRouter context={{}}>
          <SignUp createUser={spy} />
        </StaticRouter>
      ));

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = email;
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');
    });

    /* it('should set createUser errors', function(done) {
      const email = 'john@example.com';
      const password = '1234';
      const reason = 'some error message';

      const spy = sinon.spy((...args) => {
        return new Promise((resolve, reject) => reject(reason)).catch((err) => {
          console.log('err==', err);
          console.log('wrapper.find(SignUp).instance().state.error==', wrapper.find(SignUp).instance().state.error);
          debugger;
          done();
        });
      });

      const wrapper = mount((
        <StaticRouter context={{}}>
          <SignUp createUser={spy} />
        </StaticRouter>
      ));

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = email;
      inputNodes.find({type: "password"}).instance().value = password;

      wrapper.find('form').simulate('submit');
    }); */
  });
  
}