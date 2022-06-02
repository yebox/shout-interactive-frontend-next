import { baseInstance } from "../axios";

const initialState = {
  data: [],
};

// Ads Reducer
export const AdsReducer = (state = initialState, action) => {
  return { ...state, data: action.payload };
};

// Selector
export const getAds = (state) => {
  return state.ads.data;
};

// Actions
export const getAdsThunk = () => {
  return async (dispatch, state) => {
    try {
      const resp = await baseInstance.post("/ads/get-ads/");
      console.log("resp ads is...", resp.data.data);
      dispatch(setAds(resp.data.data));
    } catch (error) {
      if (error.response) {
        console.log("An error has occured", error.response);
      }
    }
  };
};

// Action creators
const setAds = (data) => {
  return { type: "set-ads", payload: data };
};
