import React from 'react';
import './mainPage.scss';
import Tags from '../../common/Tags/Tags';
import AllArticles from '../../common/AllArticles/AllArticles';

function MainPage() {
  return (
    <section className="mainPage">
      <div className="container">
        <AllArticles />
        <Tags />
      </div>
    </section>
  );
}

export default MainPage;
