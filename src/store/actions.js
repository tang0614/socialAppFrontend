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

//request  screams
export const apiGetScreamBegan = createAction("apiGetScreamBegan");
export const apiGetScreamSuccess = createAction("apiGetScreamSuccess");
export const apiGetScreamFailed = createAction("apiGetScreamFailed");

//request one scream
export const apiGetOneScreamBegan = createAction("apiGetOneScreamBegan");
export const apiGetOneScreamSuccess = createAction("apiGetOneScreamSuccess");
export const apiGetOneScreamFailed = createAction("apiGetOneScreamFailed");

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

//scream delete request
export const apiDeleteBegan = createAction("apiDeleteBegan");
export const apiDeleteSuccess = createAction("apiDeleteSuccess");
export const apiDeleteFailed = createAction("apiDeleteFailed");

//uncomment from comments
export const apiUncommentBegan = createAction("apiUncommentBegan");
export const apiUncommentSuccess = createAction("apiUncommentSuccess");
export const apiUncommentFailed = createAction("apiUncommentFailed");

//scream comment request
export const apiPostCommentBegan = createAction("apiPostCommentBegan");
export const apiPostCommentSuccess = createAction("apiPostCommentSuccess");
export const apiPostCommentFailed = createAction("apiPostCommentFailed");

//put comment detail
export const apiPutCommentBegan = createAction("apiPutCommentBegan");
export const apiPutCommentSuccess = createAction("apiPutCommentSuccess");
export const apiPutCommentFailed = createAction("apiPutCommentFailed");

//put retweet detail
export const apiPutRetweetBegan = createAction("apiPutRetweetBegan");
export const apiPutRetweetSuccess = createAction("apiPutRetweetSuccess");
export const apiPutRetweetFailed = createAction("apiPutRetweetFailed");

//like a post
export const apiPutLikeBegan = createAction("apiPutLikeBegan");
export const apiPutLikeSuccess = createAction("apiPutLikeSuccess");
export const apiPutLikeFailed = createAction("apiPutLikeFailed");

//unlike a post
export const apiPutUnLikeBegan = createAction("apiPutUnLikeBegan");
export const apiPutUnLikeSuccess = createAction("apiPutUnLikeSuccess");
export const apiPutUnLikeFailed = createAction("apiPutUnLikeFailed");
