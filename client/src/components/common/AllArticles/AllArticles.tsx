/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react';
import './allBlogs.scss';
import { useSelector } from 'react-redux';
import BlogCard from '../ArticleCard/ArticleCard';
import history from '../../../utils/history';
import { getArticles } from '../../../store/articles';
import { IArticle } from '../../../types/interfaces/IArticle';
import useSearch from '../../hooks/useSearch';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';

function AllArticles() {
  const articlesOnPage = 2;
  const [articlesShown, setArticlesShown] = useState<number>(articlesOnPage);

  const search = useSearch(history.location.search);

  const articles = useSelector(getArticles());

  let articlesFiltered: Array<IArticle>;

  if (search) {
    articlesFiltered = articles.filter((art: IArticle) => art.tags === search);
  } else {
    articlesFiltered = articles;
  }

  const handleAddArticle = (): void => {
    setArticlesShown((prev) => prev + articlesOnPage);
  };

  const checkShowButton = (): boolean => articlesFiltered.length !== articlesShown && articlesFiltered.length > articlesShown && articlesFiltered.length !== 0;

  return (
    <section className="allArticles">

      {articlesFiltered.length !== 0 ? (
        articlesFiltered.slice(0, articlesShown).map((art: IArticle) => <BlogCard key={art._id} {...art} />)
      ) : (
        <div className="card">Здесь пока нет статей</div>
      )}
      {checkShowButton() && (
        <div className="allArticles__control">
          <Button
            color={ButtonColor.SECONDARY}
            size={ButtonSize.SMALL}
            clickHandler={handleAddArticle}
          >
            Показать еще
          </Button>
        </div>
      )}

    </section>
  );
}

export default AllArticles;
