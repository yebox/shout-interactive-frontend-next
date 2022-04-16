import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getAuthStatus, getUser } from "../store/user";
import { getPartiesLoadedStatus, loadAllParties } from "../store/party";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";

const Protect = ({ children }) => {
  const { getLocalStorage } = useLocalStorage();
  const authenticated = useSelector(getAuthStatus);
  const partiesLoaded = useSelector(getPartiesLoadedStatus);
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
      console.log("auth but not party loaded");
      dispatch(loadAllParties(user.user.id));
    }
  }, [authenticated]);

  useEffect(() => {
    console.log("parties loaded", partiesLoaded);
  }, [partiesLoaded]);

  return authenticated && partiesLoaded ? <>{children}</> : <></>;
  // if (authenticated && partiesLoaded) {
  //   return <>{children}</>;
  // } else {
  //   return <></>;
  // }
};

export default Protect;