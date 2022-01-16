import axios from "axios";

import { GET_ERRORS, ADD_POST, GET_POSTS } from "./types";

export const addPost = (postData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data.errorMsg,
      // })
      console.log(err)
    );
};

export const getPosts = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};
