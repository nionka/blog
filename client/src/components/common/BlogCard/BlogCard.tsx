import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../../../store/articles';
import { getTagById } from '../../../store/tags';
import { getCurrentUserId, getUserById } from '../../../store/users';
import { dateTransform } from '../../../utils/dateTransform';
import history from '../../../utils/history';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';
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
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();

  const handleDelete = (e: any) => {
    dispatch(deleteArticle(props._id));
  };

  const handleEdit = () => {
    history.push(`/articles/${props._id}/edit`);
  }

  const checkControl = () => currentUserId === props.userId && history.location.pathname !== '/';

  return (
    <article className="card">
      <div className="card__img">
        <img src={props.image} alt={props.title} />
      </div>
      <div className='card__body'>
        <div className="card__content">
          <header className="card__header">
            <div className="card__date">{dateTransform(props.createdAt)}</div>
            <div className="card__author">{author.name}</div>
          </header>
          <div className="card__tags">{tag.name}</div>
          <Link to={`/articles/${props._id}`} className="card__title">{props.title}</Link>
          <div className="card__description">
            {props.description}
          </div>  
        </div>
        {checkControl() && (
          <div className='card__control'>
            <Button
              color={ButtonColor.SECONDARY}
              size={ButtonSize.SMALL}
              clickHandler={handleEdit}
            >
              Редактировать
            </Button>
            <Button
              customCssClass='ml'
              color={ButtonColor.SECONDARY}
              size={ButtonSize.SMALL}
              clickHandler={handleDelete}
            >
              Удалить
            </Button>
          </div>
        )} 
      </div> 
    </article>
  )
}

export default BlogCard;
