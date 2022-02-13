import React from 'react';
import './mainPage.scss';
import Tags from '../../common/Tags/Tags';
import AllArticles from '../../common/AllBlogs/AllArticles';

function MainPage(): JSX.Element {
  return (
    <section className="mainPage">
      <div className="container">
        <AllArticles />
        <Tags />
      </div>
    </section> 
  )
}

export default MainPage;
