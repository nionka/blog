import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navProfile.scss';

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  }

  return (
    <div className='profile'>
      <div className='profile__img' onClick={toggleMenu}>
        <img src="https://avatars.dicebear.com/api/avataaars/23.svg" alt="imgProfile" />
      </div>
      <div className='profile__name'>Alex</div>

      <div className={`profile__menu ${isOpen && 'open'} `}>
        <ul className='profile__list'>
          <li className='profile__item'>
            <Link to='users/5'>
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
