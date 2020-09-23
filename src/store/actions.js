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

//user put request
export const apiPutUserBegan = createAction("apiPutUserBegan ");
export const apiPutUserSuccess = createAction("apiPutUserSuccess");
export const apiPutUserFailed = createAction("apiPutUserFailed");

//request all screams
export const apiGetScreamBegan = createAction("apiGetScreamBegan");
export const apiGetScreamSuccess = createAction("apiGetScreamSuccess");
export const apiGetScreamFailed = createAction("apiGetScreamFailed");

export const apiLikeScreamBegan = createAction("apiLikeScreamBegan");
export const apiLikeScreamSuccess = createAction("apiLikeScreamSuccess ");
export const apiLikeScreamFailed = createAction("apiLikeScreamFailed");

export const apiUnLikeScreamBegan = createAction("apiUnLikeScreamBegan");
export const apiUnLikeScreamSuccess = createAction("apiUnLikeScreamSuccess ");
export const apiUnLikeScreamFailed = createAction("apiUnLikeScreamFailed");

//scream post request
export const apiPostScreamBegan = createAction("apiPostScreamBegan");
export const apiPostScreamSuccess = createAction("apiPostScreamSuccess");
export const apiPostScreamFailed = createAction("apiPostScreamFailed");
