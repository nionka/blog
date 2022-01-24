import React from 'react';
import { Link } from 'react-router-dom';
import './tags.scss';

function Tags(): JSX.Element {
  return (
    <section className="tags">
      <h2 className="tags__title">Категории</h2>
      <div className="tags__item">
        <Link to='/'>Все статьи</Link>
      </div>
      <ul className="tags__list">
        <li className="tags__item">Жизнь</li>
        <li className="tags__item">Путешествия</li>
        <li className="tags__item">Спорт</li>
        <li className="tags__item">Мода</li>
      </ul>
    </section>
  )
}

export default Tags;
