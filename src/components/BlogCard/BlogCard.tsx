import React from 'react';
import { Link } from 'react-router-dom';
import './blogCard.scss';

interface IBlogCardProp {
  id: number,
  date: string,
  author: string,
  title: string,
  description: string,
}

function BlogCard(props: IBlogCardProp): JSX.Element {
  return (
    <article className="card">
      <div className="card__img">
        <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=919&q=80" alt="travel" />
      </div>
      <div className="card__content">
        <header className="card__header">
          <div className="card__date">{props.date}</div>
          <div className="card__author">{props.author}</div>
        </header>
        <div className="card__tags">Путешествия</div>
        <Link to={`/blog/${props.id}`} className="card__title">{props.title}</Link>
        <div className="card__description">
          {props.description}
        </div>
      </div> 
    </article>
  )
}

export default BlogCard;
