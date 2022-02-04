import { createSlice } from '@reduxjs/toolkit';
import articlesService from '../services/article.service';

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
    }
  }
});

const { reducer: articlesReducer, actions } = articlesSlice;
const { articlesRequested, articlesReceved, articlesRequestFiled } = actions;

export const loadArticlesList = () => async (dispatch) => {
  dispatch(articlesRequested());

  try {
    const data = await articlesService.getAll();
    dispatch(articlesReceved(data));
  } catch (error) {
    dispatch(articlesRequestFiled(error.message));
  }
};

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoader = () => (state) => state.articles.isLoading;

export default articlesReducer;
