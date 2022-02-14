import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesListError, getArticlesListLoader, loadArticlesList } from '../../store/articles';
import { getTagsError, getTagsLoader, loadTagsList } from '../../store/tags';
import {
  getLoadingUsers, getLoggedIn, getUsersError, loadUsersList,
} from '../../store/users';
// import { TChildrenProps } from '../../types/TChildrenProps';
import Loader from '../common/Loader/Loader';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

function AppLoader({ children }: any) {
  const dispatch = useDispatch();
  const tagsLoader = useSelector(getTagsLoader());
  const articlesLoader = useSelector(getArticlesListLoader());
  const usersLoader = useSelector(getLoadingUsers());
  const isLoggedIn = useSelector(getLoggedIn());
  const tagsError = useSelector(getTagsError());
  const ArticlesError = useSelector(getArticlesListError());
  const usersError = useSelector(getUsersError());

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

  if (tagsError || ArticlesError || usersError) return <ErrorPage />;

  if (tagsLoader || articlesLoader || !usersLoader) return <Loader />;

  return children;
}

export default AppLoader;
