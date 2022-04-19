import { baseInstance } from "../axios";

const initState = {
  calendar: null,
  loading: false,
  error: "",
  //   Creating state
  creating: false,
  createError: false,
  calendarCreated: false,
};

// Action Types/
const LOAD_CALENDAR = "calendar/load";
const TOGGLE_LOADING_CALENDAR = "calendar/loading";
const SET_ERROR = "calendar/error";
const SET_CREATE_ERROR = "calendar/create";
const TOGGLE_CREATING = "calendar/creating";
const SET_CALENDAR_CREATED = "calendar/created";

// Calendar Reducer
export const CalendarReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_CALENDAR:
      return { ...state, calendar: action.payload };
    case TOGGLE_LOADING_CALENDAR:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };

    case TOGGLE_CREATING:
      return { ...state, creating: action.payload };
    case SET_CREATE_ERROR:
      return { ...state, createError: action.payload };
    case SET_CALENDAR_CREATED:
      return { ...state, calendarCreated: action.payload };

    default:
      return { ...state };
  }
};

// Selectors
export const getCalendar = (state) => {
  return state.calendar.calendar;
};
export const getCalendarError = (state) => {
  return state.calendar.error;
};
export const getIsCalendarLoading = (state) => {
  return state.calendar.loading;
};
export const getCreatingCalendarStatus = (state) => {
  return state.calendar.creating;
};
export const getCreateCalendarError = (state) => {
  return state.calendar.createError;
};
export const getCalendarCreatedStatus = (state) => {
  return state.calendar.calendarCreated;
};

// Actions
const loadCalendar = (calendar) => {
  return { type: LOAD_CALENDAR, payload: calendar };
};
const setError = (status) => {
  return { type: SET_ERROR, payload: status };
};
const toggleCreating = (status) => {
  return { type: TOGGLE_CREATING, payload: status };
};
const setCreateError = (status) => {
  return { type: SET_CREATE_ERROR, payload: status };
};
export const setCalendarCreated = (status) => {
  return { type: SET_CALENDAR_CREATED, payload: status };
};

function compare(a, b) {
  if (Date.parse(a.date) > Date.parse(b.date)) return 1;
  if (Date.parse(a.date) < Date.parse(b.date)) return -1;
  return 0;
}
// Async Actions
export const loadCalendarThunk = (id) => {
  console.log("user id is ", id);
  return async (dispatch, state) => {
    console.log("In dispath calendar");
    dispatch({ type: TOGGLE_LOADING_CALENDAR, payload: true });
    dispatch(setError(false));
    try {
      const calendarResp = await baseInstance.post("/party/calenders", { user: id });
      console.log("calendar resppnse", calendarResp);

      const calendar = calendarResp.data.data.calenders;
      dispatch(loadCalendar(calendar.sort(compare)));
      dispatch({ type: TOGGLE_LOADING_CALENDAR, payload: false });
      dispatch(setError(false));
    } catch (error) {
      console.log("An error occured in getting calendars", error.response);
      if (error.response == 400) {
        console.log("a 400 error has occured");
      } else {
      }
      dispatch({ type: TOGGLE_LOADING_CALENDAR, payload: false });
      dispatch(setError(true));
    }
  };
};

export const createCalendar = (calendarData) => {
  return async (dispatch, getState) => {
    dispatch(toggleCreating(true));
    dispatch(setCreateError(false));
    dispatch(setCalendarCreated(false));
    console.log("party data is", JSON.stringify(calendarData));
    try {
      const user = getState().user;
      console.log("IN try catch...", user.user.id);
      const resp = await baseInstance.post("/party/calenders/create", JSON.stringify(calendarData));
      dispatch(loadCalendarThunk(user.user.id));
      dispatch(toggleCreating(false));
      dispatch(setCreateError(null));
      dispatch(setCalendarCreated(true));
    } catch (error) {
      if (error.response) {
        console.log("REsponse errro", error.response);
      }
      console.log("Error creating Calendar");
      dispatch(setCreateError(true));
      dispatch(setCalendarCreated(false));
      dispatch(toggleCreating(false));
    }
  };
};
