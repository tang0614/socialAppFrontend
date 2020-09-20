import jwtDecode from "jwt-decode";
import http from "./httpService";

export const setAuthorizationHeader = (token) => {
  localStorage.setItem("IdToken", token);
  const decodedToken = jwtDecode(token, { complete: true });

  localStorage.setItem(
    "expirationDate",
    new Date(new Date().getTime() + 100000000)
  );

  http.setJwt(token);
};

export const removeAuthorizationHeader = () => {
  localStorage.removeItem("IdToken");
  localStorage.removeItem("expirationDate");
  http.deleteJwt();
};
