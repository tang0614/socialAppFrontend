import axios from "axios";
import jwtDecode from "jwt-decode";

export const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", token);
  const decodedToken = jwtDecode(IdToken);
  console.log("decodedToken", decodedToken);

  localStorage.setItem(
    "expirationDate",
    new Date(new Date().getTime() + decodedToken.exp / 1000)
  );

  axios.defaults.headers.common["Authorization"] = IdToken; //Attach Authorization header for all axios requests
};

export const removeAuthorizationHeader = () => {
  localStorage.removeItem("IdToken");
  localStorage.removeItem("expirationDate");
  delete axios.defaults.headers.common["Authorization"];
};
