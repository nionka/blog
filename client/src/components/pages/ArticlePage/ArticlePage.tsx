import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getArticleById } from '../../../store/articles';
import { getTagById } from '../../../store/tags';
import { getUserById } from '../../../store/users';
import { dateTransform } from '../../../utils/dateTransform';
import './article.scss';

type TParams = {id: string}

function ArticlePage({ match }: RouteComponentProps<TParams>): JSX.Element {
  const id = match.params.id;
  const article = useSelector(getArticleById(id));
  const author = useSelector(getUserById(article.userId));
  const tag = useSelector(getTagById(article.tags));

  if (!article) {
    return <div>Нет такого поста</div>
  }

  return (
    <section className="blog">
      <div className="container">
        <h2 className="blog__title">{article.title}</h2>
        <header className="blog__header">
          <div className="blog__date">{dateTransform(article.createdAt)}</div>
          <div className="blog__tags">{tag.name}</div>
        </header>
        <div className="blog__author">Автор: <span>{author.name}</span></div>

        <div className="blog__img">
          <img src={article.image} alt={article.title} />
        </div>
        <div className="blog__content">
          {article.content}
        </div>
      </div> 
    </section> 
  )
}

export default ArticlePage;
