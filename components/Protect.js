import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getAuthStatus, getUser } from "../store/user";
import { getPartiesLoadedStatus, loadAllParties } from "../store/party";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { getCalendar, loadCalendarThunk } from "../store/calendar";
import { getGifts, loadGiftsThunk } from "../store/gift-goal";

const Protect = ({ children }) => {
  const { getLocalStorage } = useLocalStorage();
  const authenticated = useSelector(getAuthStatus);
  const partiesLoaded = useSelector(getPartiesLoadedStatus);
  const calendar = useSelector(getCalendar);
  const gifts = useSelector(getGifts);
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const authToken = getLocalStorage("shout-token");
    console.log("auth status", authenticated);
    if (!authenticated && authToken) {
      dispatch(fetchUser(authToken));
    }
    if (authenticated && !partiesLoaded) {
      console.log("auth but no party loaded");
      dispatch(loadAllParties(user.user.id));
      dispatch(loadCalendarThunk(user.user.id));
    }
    if (authenticated && !calendar) {
      console.log("auth but no calendar loaded");
      dispatch(loadCalendarThunk(user.user.id));
    }
    if (authenticated && !gifts) {
      console.log("auth but no gifts loaded");
      dispatch(loadGiftsThunk());
    }
  }, [authenticated]);

  useEffect(() => {
    console.log("parties loaded", partiesLoaded);
  }, [partiesLoaded]);

  return authenticated ? <>{children}</> : <></>;
  // return authenticated && partiesLoaded ? <>{children}</> : <></>;
  // if (authenticated && partiesLoaded) {
  //   return <>{children}</>;
  // } else {
  //   return <></>;
  // }
};

export default Protect;
