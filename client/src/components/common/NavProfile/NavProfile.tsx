import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserById } from '../../../store/users';
import './navProfile.scss';

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserById());

  if (!currentUser) return null;

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  }

  return (
    <div className='profile'>
      <div className='profile__img' onClick={toggleMenu}>
        <img src={currentUser.image} alt="imgProfile" />
      </div>
      <div className='profile__name'>{currentUser.name}</div>

      <div className={`profile__menu ${isOpen && 'open'} `}>
        <ul className='profile__list'>
          <li className='profile__item'>
            <Link to={`/users/${currentUser._id}`}>
              Профиль
            </Link>
            </li>
          <li className='profile__item'>
            <Link to='/logout'>
              Выйти
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavProfile;
