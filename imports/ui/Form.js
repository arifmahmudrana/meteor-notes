import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Form = ({title, error, onSubmit, btnTxt, lnkTo, lnkTxt}) => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>{title}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit} className="boxed-view__form">
        <input type="email" name="email" placeholder="Email" autoComplete="email" />
        <input type="password" name="password" placeholder="Password" autoComplete="current-password" />
        <button type="submit" className="button">{btnTxt}</button>
      </form>
      <Link to={lnkTo} className="hover">{lnkTxt}</Link>
    </div>
  </div>
);

Form.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  btnTxt: PropTypes.string.isRequired,
  lnkTo: PropTypes.string.isRequired,
  lnkTxt: PropTypes.string.isRequired
};

export default Form;