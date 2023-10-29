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
      try {
        let validUser = jwt_decode(action.payload.token);
        cookie.save("auth", action.payload.token);
        return {
          ...state,
          loggedIn: true,
          token: action.payload.token,
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
    } catch (e) {
      // setLoginState(token, user, e);
      console.error(e);
    }
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);
};


export const { validateToken } = userSlice.actions;
export default userSlice.reducer;
