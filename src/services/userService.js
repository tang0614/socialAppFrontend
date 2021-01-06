import http from "./httpService";
import jwtDecode from "jwt-decode";

const registerEndpoint = "/users";
const loginEndpoint = "/login";
const token_key = "token";

export function register(user) {
  return http.post(registerEndpoint, {
    name: user.username,
    email: user.email,
    password: user.password,
  });
}

export async function login(user) {
  const { data: jwt } = await http.post(loginEndpoint, {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem(token_key, jwt);
}

export async function logout() {
  localStorage.removeItem(token_key);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token_key);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    console.log("no valid web token_key given");
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(token_key, jwt);
}

export function getJwt() {
  return localStorage.getItem(token_key);
}

http.setJwt(getJwt());
