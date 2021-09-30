import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to='/'>BLOG</Link>
        </div>
        <div className="control">
          <Link to='/authorization' className="link">Авторизация</Link>
          <span> / </span>
          <Link to='/registration' className="link">Регистрация</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;
