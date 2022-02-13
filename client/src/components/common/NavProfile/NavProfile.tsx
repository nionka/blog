/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserById } from '../../../store/users';
import './navProfile.scss';

function NavProfile() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const currentUser = useSelector(getCurrentUserById());

  if (!currentUser) return null;

  const body = document.querySelector('body');

  const toggleMenu = (): void => {
    setOpen(!isOpen);
  };

  const checkClick = (e: any): void => {
    if (!e.target.closest('.profile')) {
      setOpen(false);
    }
  };

  if (isOpen) {
    body?.addEventListener('click', checkClick);
  } else {
    body?.removeEventListener('click', checkClick);
  }

  return (
    <div className="profile">
      <div className="profile__img" role="button" onClick={toggleMenu}>
        <img src={currentUser.image} alt="imgProfile" />
      </div>
      <div className="profile__name">{currentUser.name}</div>

      <div className={`profile__menu ${isOpen && 'open'} `}>
        <ul className="profile__list">
          <li className="profile__item">
            <Link to={`/users/${currentUser._id}`} onClick={toggleMenu}>
              Профиль
            </Link>
          </li>
          <li className="profile__item">
            <Link to="/logout">
              Выйти
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavProfile;
