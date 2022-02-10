import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTags } from '../../../store/tags';
import './tags.scss';

function Tags(): JSX.Element {
  const tags = useSelector(getTags());
  return (
    <section className="tags">
      <h2 className="tags__title">Категории</h2>
      <div className="tags__item">
        <Link to='/'>Все статьи</Link>
      </div>
      <ul className="tags__list">
        {tags.map((tag: any) => (
          <li key={tag._id} className="tags__item">
            <Link to={`?category=${tag._id}`}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags;
