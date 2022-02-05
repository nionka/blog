import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesLoader, loadArticlesList } from '../../store/articles';
import { getTagsLoader, loadTagsList } from '../../store/tags';
import { getLoadingUsers, loadUsersList } from '../../store/users';

const AppLoader = ({ children }: any): JSX.Element => {
  const dispatch = useDispatch();
  const tagsLoader = useSelector(getTagsLoader());
  const articlesLoader = useSelector(getArticlesLoader());
  const usersLoader = useSelector(getLoadingUsers());

  useEffect(() => {
    dispatch(loadTagsList());
    dispatch(loadArticlesList());
    dispatch(loadUsersList());
  }, []);

  if (tagsLoader || articlesLoader || !usersLoader) return <p>Loading...</p>

  return children;
}

export default AppLoader;
