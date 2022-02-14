import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getArticle, getArticleLoader, loadArticle } from '../../../store/articles';
import { getTagById } from '../../../store/tags';
import { getUserById } from '../../../store/users';
import { TParams } from '../../../types/TParams';
import dateTransform from '../../../utils/dateTransform';
import Loader from '../../common/Loader/Loader';
import errorPic from '../../../img/errorPic.jpg';
import './article.scss';

function ArticlePage({ match }: RouteComponentProps<TParams>) {
  const { id } = match.params;
  const articleLoader = useSelector(getArticleLoader());
  const article = useSelector(getArticle());
  const author = useSelector(getUserById(article?.userId));
  const tag = useSelector(getTagById(article?.tags));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadArticle(id));
  }, []);

  if (articleLoader) {
    return <Loader />;
  }
  const showErrorImage = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLImageElement;
    target.src = errorPic;
  };

  return (
    <section className="blog">
      <div className="container">
        <h2 className="blog__title">{article.title}</h2>
        <header className="blog__header">
          <div className="blog__date">{dateTransform(article.createdAt)}</div>
          <div className="blog__tags">{tag.name}</div>
        </header>
        <div className="blog__author">
          Автор:
          <span>{author.name}</span>
        </div>

        <div className="blog__img">
          <img src={article.image} alt={article.title} onError={showErrorImage} />
        </div>
        <div className="blog__content">
          {article.content}
        </div>
      </div>
    </section>
  );
}

export default ArticlePage;
