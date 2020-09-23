import { createAction } from "@reduxjs/toolkit";

//login and signup and post request
export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSuccess = createAction("apiCallSuccess");
export const apiCallFailed = createAction("apiCallFailed");
export const logoutUser = createAction("logoutUser");

//post request
export const apiPostBegan = createAction("apiPostBegan");
export const apiPostSuccess = createAction("apiPostSuccess");
export const apiPostFailed = createAction("apiIPostFailed");

//post scream
export const apiPostScreamBegan = createAction("apiPostScreamBegan ");
export const apiPostScreamSuccess = createAction("apiPostScreamSuccess");
export const apiPostScreamFailed = createAction("apiPostScreamFailed");

//user get user request
export const apiGetUserBegan = createAction("apiGetUserBegan ");
export const apiGetUserSuccess = createAction("apiGetUserSuccess");
export const apiGetUserFailed = createAction("apiGetUserFailed");

//scream get request
export const apiGetScreamBegan = createAction("apiGetScreamBegan");
export const apiGetScreamSuccess = createAction("apiGetScreamSuccess");
export const apiGetScreamFailed = createAction("apiGetScreamFailed");

export const apiLikeScreamBegan = createAction("apiLikeScreamBegan");
export const apiLikeScreamSuccess = createAction("apiLikeScreamSuccess ");
export const apiLikeScreamFailed = createAction("apiLikeScreamFailed");

export const apiUnLikeScreamBegan = createAction("apiUnLikeScreamBegan");
export const apiUnLikeScreamSuccess = createAction("apiUnLikeScreamSuccess ");
export const apiUnLikeScreamFailed = createAction("apiUnLikeScreamFailed");

//get user information
export const apiUserInfo = createAction("apiUserInfo");

//Delete
export const apiDeleteBegan = createAction("apiDeleteBegan");
export const apiDeleteSuccess = createAction("apiDeleteSuccess ");
export const apiDeleteFailed = createAction("apiDeleteFailed");
