import React from 'react';
import { RouteComponentProps } from 'react-router';
import './blog.scss';
import { allBlog } from '../../api/blogs';

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
      <h2 className="blog__title">{blog.title}</h2>
    </section> 
  )
}

export default Blog;
