import React from 'react';
import './mainPage.scss';
import { allBlog } from '../../api/blogs';
import BlogCard from '../BlogCard/BlogCard';

function MainPage(): JSX.Element {
  return (
    <section className="mainPage">
      <div className="container">
        <div className="content">
          {allBlog.map(blog => <BlogCard key={blog.id} {...blog} />)}
        </div>
      </div>
    </section> 
  )
}

export default MainPage;
