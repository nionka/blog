import React from 'react';
import './allBlogs.scss';
import BlogCard from '../BlogCard/BlogCard';
import history from '../../../utils/history';
import { useSelector } from 'react-redux';
import { getArticles } from '../../../store/articles';
import { IArticle } from '../../../interfaces/interfaces';

function AllBlogs(): JSX.Element {
  const searchParams = new URLSearchParams(history.location.search);
  const search = searchParams.get('category');
  
  const articles = useSelector(getArticles());
  let articlesFiltered;

  if (search) {
    articlesFiltered = articles.filter((art: IArticle) => art.tags === search);
  } else {
    articlesFiltered = articles;
  }

  return (
    <section className="allBlogs">
      
      {articlesFiltered.length !== 0 ? (
        articlesFiltered.map((art: IArticle) => <BlogCard key={art._id} {...art} />)
        ) : (
          <div className='card'>Здесь пока нет статей</div>
        )
      }
    </section>
  )
}

export default AllBlogs;
