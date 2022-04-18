import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { UserReducer } from "./user";
import thunk from "redux-thunk";
import { PartyReducer } from "./party";
import { CalendarReducer } from "./calendar";

const appStore = createStore(combineReducers({ user: UserReducer, allParties: PartyReducer, calendar: CalendarReducer }), applyMiddleware(thunk));

export default function AppStoreProvider({ children }) {
  return <Provider store={appStore}>{children}</Provider>;
}

// export default AppStoreProvider;
