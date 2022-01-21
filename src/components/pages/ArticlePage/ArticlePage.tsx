import React from 'react';
import { RouteComponentProps } from 'react-router';
import './article.scss';
import { allBlog } from '../../../api/blogs';

type TParams = {id: string}

function Blog({ match }: RouteComponentProps<TParams>): JSX.Element {
  const id = Number(match.params.id);
  
  const isBlog = allBlog.filter(blog => blog.id === id);

  const blog = isBlog[0];

  if (isBlog.length === 0) {
    return <div>Нет такого блога</div>
  }

  return (
    <section className="blog">
      <div className="container">
        <h2 className="blog__title">{blog.title}</h2>
        <header className="blog__header">
          <div className="blog__date">{blog.date}</div>
          <div className="blog__tags">{blog.tags}</div>
        </header>
        <div className="blog__author">Автор: <span>{blog.author}</span></div>

        <div className="blog__img">
          <img src={blog.url} alt={blog.title} />
        </div>
        <div className="blog__content">
          {blog.content}
        </div>
      </div> 
    </section> 
  )
}

export default Blog;
