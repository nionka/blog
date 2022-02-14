/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import articlesService from '../services/article.service';
import history from '../utils/history';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    entities: null,
    article: null,
    isLoadingArticle: true,
    isLoading: true,
    error: null,
  },
  reducers: {
    articlesListRequested: (state) => {
      state.isLoading = true;
    },
    articlesListReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    articlesListRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    articleCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    articleDeleted: (state, action) => {
      state.entities = state.entities.filter((art) => art._id !== action.payload);
    },
    articleFiled: (state, action) => {
      state.error = action.payload;
      state.isLoadingArticle = false;
    },
    articleRequested: (state) => {
      state.isLoadingArticle = true;
    },
    articleReceved: (state, action) => {
      state.article = action.payload;
      state.isLoadingArticle = false;
    },

  },
});

const { reducer: articlesReducer, actions } = articlesSlice;
const {
  articlesListRequested,
  articlesListReceved,
  articlesListRequestFiled,
  articleCreated,
  articleDeleted,
  articleReceved,
  articleFiled,
  articleRequested,
} = actions;

export const loadArticlesList = () => async (dispatch) => {
  dispatch(articlesListRequested());

  try {
    const data = await articlesService.getAll();
    dispatch(articlesListReceved(data));
  } catch (error) {
    dispatch(articlesListRequestFiled(error.message));
  }
};

export const createArticle = (payload) => async (dispatch) => {
  try {
    const data = await articlesService.createArticle(payload);
    dispatch(articleCreated(data));
    history.push(`/articles/${data._id}`);
  } catch (error) {
    dispatch(articleFiled(error.message));
  }
};

export const loadArticle = (articleId) => async (dispatch) => {
  dispatch(articleRequested());
  try {
    const data = await articlesService.getArticle(articleId);
    dispatch(articleReceved(data));
  } catch (error) {
    dispatch(articleFiled(error.message));
  }
};

export const updateArticle = (articleId, payload) => async (dispatch) => {
  try {
    const data = await articlesService.updateArticle(articleId, payload);
    if (data) {
      dispatch(articleReceved(data));
      history.push(`/articles/${data._id}`);
    }
  } catch (error) {
    dispatch(articleFiled(error.message));
  }
};

export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await articlesService.deleteArticle(articleId);
    if (!data) {
      dispatch(articleDeleted(articleId));
    }
  } catch (error) {
    dispatch(articleFiled(error.message));
  }
};

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesListLoader = () => (state) => state.articles.isLoading;
export const getArticlesListError = () => (state) => state.articles.error;
export const getArticlesByUser = (userId) => (state) => (state.articles.entities
  ? state.articles.entities.filter((art) => art.userId === userId)
  : []);
export const getArticle = () => (state) => state.articles.article;
export const getArticleLoader = () => (state) => state.articles.isLoadingArticle;

export default articlesReducer;
