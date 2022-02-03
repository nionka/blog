import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTagsLoader, loadTagsList } from '../../store/tags';

const AppLoader = ({ children }: any): JSX.Element => {
  const dispatch = useDispatch();
  const tagsLoader = useSelector(getTagsLoader());

  useEffect(() => {
    dispatch(loadTagsList());
  }, []);

  if (tagsLoader) return <p>Loading...</p>

  return children;
}

export default AppLoader;
