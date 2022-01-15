import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(
      "https://fathomless-spire-96269.herokuapp.com/api/users/register",
      userData
    )
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errorMsg,
      })
    );
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post(
      "https://fathomless-spire-96269.herokuapp.com/api/users/login",
      userData
    )
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jereerBlogToken", token);
      // Set Token to Authorization header
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/posts");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errorMsg,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jereerBlogToken");
  // remove Authorization header
  setAuthToken(false);
  // set user obj. to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
