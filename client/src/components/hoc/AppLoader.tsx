import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesListLoader, loadArticlesList } from '../../store/articles';
import { getTagsLoader, loadTagsList } from '../../store/tags';
import { getLoadingUsers, getLoggedIn, loadUsersList } from '../../store/users';
import Loader from '../common/Loader/Loader';

const AppLoader = ({ children }: any): JSX.Element => {
  const dispatch = useDispatch();
  const tagsLoader = useSelector(getTagsLoader());
  const articlesLoader = useSelector(getArticlesListLoader());
  const usersLoader = useSelector(getLoadingUsers());
  const isLoggedIn = useSelector(getLoggedIn());

  useEffect(() => {
    dispatch(loadTagsList());
    dispatch(loadArticlesList());
    dispatch(loadUsersList());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }  
  }, [isLoggedIn]);

  if (tagsLoader || articlesLoader || !usersLoader) return <Loader />

  return children;
}

export default AppLoader;
