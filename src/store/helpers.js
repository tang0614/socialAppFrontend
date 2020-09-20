import jwtDecode from "jwt-decode";
import http from "./httpService";

export const setAuthorizationHeader = (token) => {
  localStorage.setItem("IdToken", token);

  localStorage.setItem(
    "expirationDate",
    new Date(new Date().getTime() + 1000000000)
  );

  http.setJwt(token);
};

export const removeAuthorizationHeader = () => {
  localStorage.removeItem("IdToken");
  localStorage.removeItem("expirationDate");
  http.deleteJwt();
};

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("IdToken");
    const user = jwtDecode(jwt);
    console.log("getCurrentUser", user);
    return user;
  } catch (ex) {
    console.log("no valid web token_key given");
  }
}

export function checkExpiration() {
  const token = localStorage.getItem("IdToken");
  if (token) {
    const expirationDate = localStorage.getItem("expirationDate");
    if (expirationDate < Date.now()) {
      console.log("token expired ....");

      return true;
    }
  }
}
