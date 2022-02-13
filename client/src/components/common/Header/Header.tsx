import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedIn } from '../../../store/users';
import Logo from '../Logo/Logo';
import NavProfile from '../NavProfile/NavProfile';
import './header.scss';

function Header() {
  const isLoggedIn = useSelector(getLoggedIn());

  return (
    <header className="header">
      <div className="container">
        <Logo />
        {isLoggedIn ? (
          <NavProfile />
        ) : (
          <div className="control">
            <Link to="/authorization" className="link">Вход</Link>
            <span> / </span>
            <Link to="/registration" className="link">Регистрация</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
