import { createSlice } from '@reduxjs/toolkit';
import articlesService from '../services/article.service';
import history from '../utils/history';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    articlesRequested: (state) => {
      state.isLoading = true;
    },
    articlesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    articlesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    articleCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    articleDeleted: (state, action) => {
      state.entities = state.entities.filter((art) => art._id !== action.payload);
    }

  }
});

const { reducer: articlesReducer, actions } = articlesSlice;
const {
  articlesRequested,
  articlesReceved,
  articlesRequestFiled,
  articleCreated,
  articleDeleted
} = actions;

export const loadArticlesList = () => async (dispatch) => {
  dispatch(articlesRequested());

  try {
    const data = await articlesService.getAll();
    dispatch(articlesReceved(data));
  } catch (error) {
    dispatch(articlesRequestFiled(error.message));
  }
};

export const createArticle = (payload) => async (dispatch) => {
  try {
    const data = await articlesService.createArticle(payload);
    dispatch(articleCreated(data));
    history.push(`/article/${data._id}`);
  } catch (error) {
    dispatch(articlesRequestFiled(error.message));
  }
};

export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await articlesService.deleteArticle(articleId);
    if (!data) {
      dispatch(articleDeleted(articleId));
    }
  } catch (error) {
    dispatch(articlesRequestFiled(error.message));
  }
}

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoader = () => (state) => state.articles.isLoading;
export const getArticlesByUser = (userId) => (state) => {
  return state.articles.entities
    ? state.articles.entities.filter((art) => art.userId === userId)
    : []
};
export const getArticleById = (articleId) => (state) => {
  return state.articles.entities
    ? state.articles.entities.find((art) => art._id === articleId)
    : null
};

export default articlesReducer;
