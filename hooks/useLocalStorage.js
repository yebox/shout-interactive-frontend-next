import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

const useLocalStorage = () => {
  const dispatch = useDispatch();
  const setLocalStorage = (key, value) => {
    console.log("setting local storage");
    localStorage.setItem(`${key}`, value);
  };

  const getLocalStorage = (key) => {
    return localStorage.getItem(`${key}`);
  };

  const logOut = () => {
    const token = localStorage.getItem("token");
    localStorage.setItem("token", "");
  };

  return { setLocalStorage, getLocalStorage, logOut };
};

export default useLocalStorage;
