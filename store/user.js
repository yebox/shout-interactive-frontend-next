import { baseInstance } from "../axios";

// Action types
const LOAD_USER = "user/load-user";
const SET_AUTH = "user/set-auth-status";

// init state
const initialState = {
  user: null,
  token: null,
  coins: 0,
  authenticated: false,
};

// UserReducer
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action?.payload?.user, coins: action?.payload?.coin, token: action?.payload?.token };
    case SET_AUTH:
      return { ...state, authenticated: action.payload };
    default:
      return { ...state };
  }
};

// Selectors
export const getUser = (state) => {
  return state.user;
};
export const getAuthStatus = (state) => {
  return state.user.authenticated;
};

// Actions;
export const loadUser = (userData) => {
  return { type: LOAD_USER, payload: userData };
};

export const setAuthStatus = (status) => {
  return { type: SET_AUTH, payload: status };
};

export const fetchUser = (token) => {
  console.log("in fetch user");
  return async (dispatch, state) => {
    try {
      const resp = await baseInstance.get(`/auth/token/${token}`);
      console.log("response from fetch user is", resp.data.data);
      dispatch(loadUser(resp.data.data));
      localStorage.setItem("shout-token", resp.data.data.token);
      dispatch(setAuthStatus(true));
    } catch (error) {
      console.log("An error occured", error);
      dispatch(setAuthStatus(false));
    }
  };
};
