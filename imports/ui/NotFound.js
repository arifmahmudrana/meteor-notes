import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Page Not Found</h1>
      <p>Hmmm, we're unable to find this page</p>
      <Link to="/" className="button button--link">Head Home</Link>
    </div>
  </div>
);

export default NotFound;