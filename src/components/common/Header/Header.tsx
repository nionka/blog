import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './header.scss';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <div className="control">
          <Link to='/authorization' className="link">Вход</Link>
          <span> / </span>
          <Link to='/registration' className="link">Регистрация</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;
