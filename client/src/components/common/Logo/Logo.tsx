import React from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

function Logo(): JSX.Element {
  return (
    <div className="logo">
      <Link to='/'>Wide World</Link>
      <div className="logo__slogan">Пиши о том, что нравится</div>
    </div>
  )
}

export default Logo;