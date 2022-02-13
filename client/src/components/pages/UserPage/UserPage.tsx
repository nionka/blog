/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IArticle } from '../../../types/interfaces/IArticle';
import { getArticlesByUser } from '../../../store/articles';
import { getCurrentUserId, getUserById } from '../../../store/users';
import history from '../../../utils/history';
import BlogCard from '../../common/ArticleCard/ArticleCard';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';
import './userPage.scss';
import { TParams } from '../../../types/TParams';

function UserPage({ match }: RouteComponentProps<TParams>) {
  const userId = match.params.id;
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));
  const articles = useSelector(getArticlesByUser(userId));

  const handleAddPost = (): void => {
    history.push('/articles/add');
  };

  return (
    <section className="user-profile">
      <div className="container">
        <div className="user-profile__card">
          <div className="user-profile__img">
            <img src={user.image} alt="user img" />
          </div>
          <div className="user-profile__name">{user.name}</div>
          <div className="user-profile__stat">
            <div className="stat__title">Всего постов</div>
            <div className="stat__count">{articles.length}</div>
          </div>
          {(userId === currentUserId) && (
            <div className="user-profile__control">
              <Button
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
                type="button"
                clickHandler={handleAddPost}
              >
                Написать пост
              </Button>
            </div>
          )}
        </div>

        <div className="user-profile__article">
          <div className="user-profile__article-title">Посты</div>
          {articles.length === 0 ? (
            <p className="card">Здесь пока ничего нет</p>
          ) : (
            articles.map((art: IArticle) => <BlogCard key={art._id} {...art} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default UserPage;
