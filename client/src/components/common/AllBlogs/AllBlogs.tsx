import React, { useState } from 'react';
import './allBlogs.scss';
import BlogCard from '../BlogCard/BlogCard';
import history from '../../../utils/history';
import { useSelector } from 'react-redux';
import { getArticles } from '../../../store/articles';
import { IArticle } from '../../../interfaces/interfaces';
import useSearch from '../../hooks/useSearch';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';

function AllBlogs(): JSX.Element {
  const articlesOnPage = 2;
  const [articlesShown, setArticlesShown] = useState(articlesOnPage);

  const search = useSearch(history.location.search);
  
  const articles = useSelector(getArticles());

  let articlesFiltered: Array<IArticle>;

  if (search) {
    articlesFiltered = articles.filter((art: IArticle) => art.tags === search);
  } else {
    articlesFiltered = articles;
  }

  const handleAddArticle = (e: any) => {
    setArticlesShown(prev => prev + articlesOnPage);
  }

  const checkShowButton = () => {
    return articlesFiltered.length !== articlesShown && articlesFiltered.length > articlesShown && articlesFiltered.length !== 0;
  }

  return (
    <section className="allBlogs">
      
      {articlesFiltered.length !== 0 ? (
        articlesFiltered.slice(0, articlesShown).map((art: IArticle) => <BlogCard key={art._id} {...art} />)
        ) : (
          <div className='card'>Здесь пока нет статей</div>
        )
      }
      {checkShowButton() && (
        <Button
          color={ButtonColor.PRIMARY}
          size={ButtonSize.SMALL}
          clickHandler={handleAddArticle}
        >
          Показать еще
        </Button>
      )}
      
    </section>
  )
}

export default AllBlogs;
