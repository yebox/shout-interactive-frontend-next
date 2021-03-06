import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { UserReducer } from "./user";
import thunk from "redux-thunk";
import { PartyReducer } from "./party";
import { CalendarReducer } from "./calendar";
import { GiftsReducer } from "./gift-goal";
import { AdsReducer } from "./ads";

const appStore = createStore(combineReducers({ user: UserReducer, allParties: PartyReducer, calendar: CalendarReducer, gifts: GiftsReducer, ads: AdsReducer }), applyMiddleware(thunk));

export default function AppStoreProvider({ children }) {
  return <Provider store={appStore}>{children}</Provider>;
}

// export default AppStoreProvider;
