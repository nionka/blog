import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTagById } from '../../../store/tags';
import { getUserById } from '../../../store/users';
import { dateTransform } from '../../../utils/dateTransform';
import './blogCard.scss';

interface IBlogCardProp {
  _id: string,
  userId: string,
  title: string,
  description: string,
  image: string,
  tags: string,
  content: string,
  createdAt: string
}

function BlogCard(props: IBlogCardProp): JSX.Element {
  const author = useSelector(getUserById(props.userId));
  const tag = useSelector(getTagById(props.tags));

  return (
    <article className="card">
      <div className="card__img">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="card__content">
        <header className="card__header">
          <div className="card__date">{dateTransform(props.createdAt)}</div>
          <div className="card__author">{author.name}</div>
        </header>
        <div className="card__tags">{tag.name}</div>
        <Link to={`/article/${props._id}`} className="card__title">{props.title}</Link>
        <div className="card__description">
          {props.description}
        </div>
      </div> 
    </article>
  )
}

export default BlogCard;
