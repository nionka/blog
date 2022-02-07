import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import usersService from '../services/users.service';
import { errorGenerate } from '../utils/errorGenerate';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      isLoadingUsers: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      isLoadingUsers: false
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLogOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.isLoadingUsers = true;
    },
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingUsers = false;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userLogOut,
  usersReceved,
  usersRequestFailed,
  usersRequested,
} = actions;

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());

  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push('/');
  } catch (error) {
    const { status, data } = error.response;
    if (status === 400) {
      const errorMessage = errorGenerate(data.message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signIn = (payload) => async (dispatch) => {
  dispatch(authRequested());

  try {
    const data = await authService.login(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push('/');
  } catch (error) {
    const { status, data } = error.response;
    if (status === 400) {
      const errorMessage = errorGenerate(data.message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const logOut = () => async (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogOut());
  history.push('/');
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await usersService.get();
    dispatch(usersReceved(data));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
}

export const authErrorDelete = () => (dispatch) => {
  dispatch(authRequested());
}

export const getAuthErrors = () => (state) => state.users.error;
export const getLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) => state.users?.auth?.userId;
export const getCurrentUserById = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === state.users.auth.userId);
  }

  return null
};
export const getUsers = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => state.users.entities.find((user) => user._id === userId)
export const getLoadingUsers = () => (state) => state.users.isLoadingUsers;

export default usersReducer;
