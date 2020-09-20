import { createAction } from "@reduxjs/toolkit";

//login and signup and post request
export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSuccess = createAction("apiCallSuccess");
export const apiCallFailed = createAction("apiCallFailed");
export const logoutUser = createAction("logoutUser");

//user get user request
export const apiGetUserBegan = createAction("apiGetUserBegan ");
export const apiGetUserSuccess = createAction("apiGetUserSuccess");
export const apiGetUserFailed = createAction("apiGetUserFailed");
