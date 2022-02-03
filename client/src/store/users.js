import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import { errorGenerate } from '../utils/errorGenerate';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false
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
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userLogOut
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
}

export const authErrorDelete = () => (dispatch) => {
  dispatch(authRequested());
}

export const getAuthErrors = () => (state) => state.users.error;
export const getLoggedIn = () => (state) => state.users.isLoggedIn;

export default usersReducer;
