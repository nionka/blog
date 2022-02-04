import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesLoader, loadArticlesList } from '../../store/articles';
import { getTagsLoader, loadTagsList } from '../../store/tags';

const AppLoader = ({ children }: any): JSX.Element => {
  const dispatch = useDispatch();
  const tagsLoader = useSelector(getTagsLoader());
  const articlesLoader = useSelector(getArticlesLoader());

  useEffect(() => {
    dispatch(loadTagsList());
    dispatch(loadArticlesList());
  }, []);

  if (tagsLoader || articlesLoader) return <p>Loading...</p>

  return children;
}

export default AppLoader;
