import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../../../store/articles';
import { getTagById } from '../../../store/tags';
import { getCurrentUserId, getUserById } from '../../../store/users';
import { IArticleCardProps } from '../../../types/interfaces/IArticleCardProps';
import dateTransform from '../../../utils/dateTransform';
import history from '../../../utils/history';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';
import './articleCard.scss';

function ArticleCard({
  userId, tags, _id, title, description, image, createdAt,
}: IArticleCardProps) {
  const author = useSelector(getUserById(userId));
  const tag = useSelector(getTagById(tags));
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();

  const handleDelete = (): void => {
    dispatch(deleteArticle(_id));
  };

  const handleEdit = (): void => {
    history.push(`/articles/${_id}/edit`);
  };

  const checkControl = (): boolean => currentUserId === userId && history.location.pathname !== '/';

  return (
    <article className="card">
      <div className="card__img">
        <img src={image} alt={title} />
      </div>
      <div className="card__body">
        <div className="card__content">
          <header className="card__header">
            <div className="card__date">{dateTransform(createdAt)}</div>
            <div className="card__author">{author.name}</div>
          </header>
          <div className="card__tags">{tag.name}</div>
          <Link to={`/articles/${_id}`} className="card__title">{title}</Link>
          <div className="card__description">
            {description}
          </div>
        </div>
        {checkControl() && (
          <div className="card__control">
            <Button
              color={ButtonColor.SECONDARY}
              size={ButtonSize.SMALL}
              clickHandler={handleEdit}
            >
              Редактировать
            </Button>
            <Button
              customCssClass="ml"
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
  );
}

export default ArticleCard;
