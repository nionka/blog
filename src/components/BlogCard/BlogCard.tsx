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
      <Link to={`/blog/${props.id}`} className="card__title">{props.title}</Link>
      <div className="card__description">
        {props.description}
      </div>
      <footer className="card__footer">
        <div className="card__author">{props.author}</div>
        <div className="card__date">{props.date}</div>
      </footer>
    </article>
  )
}

export default BlogCard;
