import { createSlice } from '@reduxjs/toolkit';
import tagsService from '../services/tags.service';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    tagsRequested: (state) => {
      state.isLoading = true;
    },
    tagsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
  },
    tagsRequestFiled: (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
    }
  }
});

const { reducer: tagsReducer, actions } = tagsSlice;
const { tagsRequested, tagsReceved, tagsRequestFiled } = actions;

export const loadTagsList = () => async (dispatch) => {
  dispatch(tagsRequested());

  try {
    const data = await tagsService.getAll();
    dispatch(tagsReceved(data));
  } catch (error) {
    dispatch(tagsRequestFiled(error.message));
  }
};

export const getTags = () => (state) => state.tags.entities;
export const getTagsLoader = () => (state) => state.tags.isLoading;
export const getTagById = (tagId) => (state) => {
  if (state.tags.entities) {
    return state.tags.entities.find((tag) => tag._id === tagId)
  }

  return null
};

export default tagsReducer;
