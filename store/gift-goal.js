import { baseInstance } from "../axios";
import { loadAllParties } from "./party";

const initState = {
  gifts: null,
  loadError: false,
  loading: false,

  createGiftGoalError: false,
  creatingGoal: false,
  createdGoal: false,
};

// Action Types
const LOAD_GIFTS = "gifts/load";
const SET_LOAD_GIFT_ERROR = "gift/load-error";
const TOGGLE_LOADING_GIFT = "gift/toggle-loading";

const SET_CREATED_GOAL = "gift-goal/set-created-goal";
const SET_CREATE_ERROR = "gift-goal/set-create-error";
const SET_CREATING_GOAL = "gift-goal/set-creating";

// Gift Goal Reducer
export const GiftsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOAD_GIFT_ERROR:
      return { ...state, loadError: action.payload };
    case TOGGLE_LOADING_GIFT:
      return { ...state, loading: action.payload };
    case LOAD_GIFTS:
      return { ...state, gifts: action.payload };

    case SET_CREATED_GOAL:
      return { ...state, createdGoal: action.payload };
    case SET_CREATING_GOAL:
      return { ...state, creatingGoal: action.payload };
    case SET_CREATE_ERROR:
      return { ...state, createGiftGoalError: action.payload };

    default:
      return { ...state };
  }
};

// Selectors
export const getGifts = (state) => {
  return state.gifts.gifts;
};
export const getLoadingStatus = (state) => {
  return state.gifts.loading;
};
export const getLoadErrorStatus = (state) => {
  return state.gifts.loadError;
};
// create gift goal selectors
export const getCreatingGoalStatus = (state) => {
  return state.gifts.creatingGoal;
};
export const getCreatedStatus = (state) => {
  return state.gifts.createdGoal;
};
export const getCreateErrorStatus = (state) => {
  return state.gifts.createGiftGoalError;
};

// Action Creators
const loadGifts = (gifts) => {
  return { type: LOAD_GIFTS, payload: gifts };
};
const loading = (status) => {
  return { type: TOGGLE_LOADING_GIFT, payload: status };
};
const setLoadError = (status) => {
  return { type: SET_LOAD_GIFT_ERROR, payload: status };
};
// Create gift goal actions
export const setCreatedGoalStatus = (status) => {
  return { type: SET_CREATED_GOAL, payload: status };
};
const setCreateError = (status) => {
  return { type: SET_CREATE_ERROR, payload: status };
};
const setCreatingGoal = (status) => {
  return { type: SET_CREATING_GOAL, payload: status };
};
// Async Actions - Thunk
export const loadGiftsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      dispatch(setLoadError(false));
      const resp = await baseInstance.post("/party/gift/all");
      console.log("In loading gift thunk:", resp.data);
      dispatch(loadGifts(resp.data.gifts));
    } catch (error) {
      if (error.response) {
        console.log("Error loading gifts: Response data", error.response);
      } else {
        console.log("Error loading gifts", error);
      }
      dispatch(setLoadError(true));
      dispatch(loading(true));
      dispatch(loadGifts(null));
    }
  };
};

export const createGiftGoalThunk = (giftData, userId) => {
  return async (dispatch) => {
    try {
      dispatch(setCreateError(false));
      dispatch(setCreatingGoal(true));
      dispatch(setCreatedGoalStatus(false));
      const resp = await baseInstance.post("/party/gift", JSON.stringify(giftData));
      console.log("In Create Gift goal thunk", resp.data);
      dispatch(setCreatingGoal(false));
      dispatch(setCreatedGoalStatus(true));
      dispatch(loadAllParties(userId));
    } catch (error) {
      console.log("create goal error");
      dispatch(setCreateError(true));
      dispatch(setCreatingGoal(false));
      dispatch(setCreatedGoalStatus(false));
    }
  };
};

export const sendGiftCoins = (amount) => {};
