import React from 'react';
import { Link } from 'react-router-dom';
import './blogCard.scss';

interface IBlogCardProp {
  id: string,
  date: string,
  author: string,
  title: string,
  description: string,
  url: string,
  tags: string,
  content: string
}

function BlogCard(props: IBlogCardProp): JSX.Element {
  return (
    <article className="card">
      <div className="card__img">
        <img src={props.url} alt="travel" />
      </div>
      <div className="card__content">
        <header className="card__header">
          <div className="card__date">{props.date}</div>
          <div className="card__author">{props.author}</div>
        </header>
        <div className="card__tags">{props.tags}</div>
        <Link to={`/article/${props.id}`} className="card__title">{props.title}</Link>
        <div className="card__description">
          {props.description}
        </div>
      </div> 
    </article>
  )
}

export default BlogCard;
