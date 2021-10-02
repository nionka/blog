import React from 'react';
import './mainPage.scss';
import Tags from '../Tags/Tags';
import AllBlogs from '../AllBlogs/AllBlogs';

function MainPage(): JSX.Element {
  return (
    <section className="mainPage">
      <div className="container">
        <AllBlogs />
        <Tags />
      </div>
    </section> 
  )
}

export default MainPage;
