/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import base64 from "base-64";
import { useEffect } from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    token: "",
    userInfo: {},
    error: null,
  },
  reducers: {
    validateToken(state, action) {
      console.log(action.payload,'---------------------------')
      try {
        let validUser = jwt_decode(action.payload);
        cookie.save("auth", action.payload);
        return {
          ...state,
          loggedIn: true,
          token: action.payload,
          userInfo: {
            validUser
          },
        };

      } catch (e) {
        console.log("Token Validation Error", e);
        return {
          ...state,
          loggedIn: false,
          token: null,
          userInfo: {},
        };
      }
    },

  },
});

export const login = (values) => async (dispatch, state) => {
  const data = await superagent
    .post(`${import.meta.env.VITE_DATABASE_URL}/signin`)
    .set("authorization", `Basic ${base64.encode(`${values.username}:${values.password}`)}`);

  if (data.body) {
    try {
      dispatch(validateToken(data.body.token));
      console.log(data.body)
    } catch (e) {
      // setLoginState(token, user, e);
      console.error(e);
    }
  }
};
export const signup = (username, password, role)=> async (dispatch, state) => {
  const data = await superagent.post(
    `${import.meta.env.VITE_DATABASE_URL}/signup`,
    { username: username, password: password, role: role }
  );

  if (data.body) {
    try {
      dispatch(validateToken(data.body.token));
      // navigate("/");
    } catch (e) {
      // setLoginState(loggedIn, token, user, e);
      console.error(e);
    }
  }
};

  // useEffect(() => {
  //   const qs = new URLSearchParams(window.location.search);
  //   const cookieToken = cookie.load("auth");
  //   const token = qs.get("token") || cookieToken || null;
  //   validateToken(token);
  // }, []);
export const { validateToken } = userSlice.actions;
export default userSlice.reducer;
