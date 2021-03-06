import { baseInstance } from "../axios";
import { encryptId } from "../utils/encryptId";

// Action types
const LOAD_USER = "user/load-user";
const SET_AUTH = "user/set-auth-status";
const SET_INVALID_TOKEN = "user/set-invalid-token";
const SET_LOADING = "user/set-loading";
const SET_COIN_BAL = "user/set-coin-balance";

// init state
const initialState = {
  user: null,
  token: null,
  coins: 0,
  authenticated: false,
  invalidToken: false,
  loading: true,
};

// UserReducer
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action?.payload?.user, token: action?.payload?.token };
    // return { ...state, user: action?.payload?.user, coins: action?.payload?.coin, token: action?.payload?.token };
    case SET_AUTH:
      return { ...state, authenticated: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_INVALID_TOKEN:
      return { ...state, invalidToken: action.payload };
    case SET_COIN_BAL:
      return { ...state, coins: action.payload };
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
export const getLoadingStatus = (state) => {
  return state.user.loading;
};
export const getTokenValidStatus = (state) => {
  return state.user.invalidToken;
};

// Actions Creators
export const loadUser = (userData) => {
  return { type: LOAD_USER, payload: userData };
};

export const setAuthStatus = (status) => {
  return { type: SET_AUTH, payload: status };
};
export const setLoadingStatus = (status) => {
  return { type: SET_LOADING, payload: status };
};
export const setInvalidTokenStatus = (status) => {
  return { type: SET_INVALID_TOKEN, payload: status };
};

export const setCoinBalance = (bal) => {
  return { type: SET_COIN_BAL, payload: bal };
};

// Actions-Thunk*
export const fetchUser = (token) => {
  console.log("in fetch user");
  return async (dispatch, state) => {
    try {
      const resp = await baseInstance.get(`/auth/token/${token}`);
      console.log("response from fetch user is", resp.data.data);
      dispatch(loadUser(resp.data.data));
      dispatch(getUserBalanceThunk(resp.data.data.user.id));
      localStorage.setItem("shout-token", resp.data.data.token);
      dispatch(setLoadingStatus(false));
      dispatch(setAuthStatus(true));
      dispatch(setInvalidTokenStatus(false));
    } catch (error) {
      if (error.response) {
        console.log("An error occured in getting user token...", error.response);
        dispatch(setInvalidTokenStatus(true));
      } else {
        console.log("An error occured in getting user token...", error);
      }
      dispatch(setAuthStatus(false));
      dispatch(setLoadingStatus(false));
    }
  };
};

export const getUserBalanceThunk = (userId) => {
  return async (dispatch) => {
    try {
      const body = { data: encryptId(JSON.stringify({ user: userId })) };
      const resp = await baseInstance.post("/billing/check-coin", JSON.stringify(body));
      console.log("Coin balance is ", resp.data.data.coins);
      dispatch(setCoinBalance(resp.data.data.coins));
    } catch (error) {
      // dispatch(setCoinBalance(null));
    }
  };
};
