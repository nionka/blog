import React from 'react';
import './allBlogs.scss';
import { allBlog } from '../../api/blogs';
import BlogCard from '../BlogCard/BlogCard';

function AllBlogs(): JSX.Element {
  return (
    <section className="allBlogs">
      {allBlog.map(blog => <BlogCard key={blog.id} {...blog} />)}
    </section>
  )
}

export default AllBlogs;
