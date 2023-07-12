import axios from "axios";
import jwt_decode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("access", token);
};

export const getToken = () => {
  return localStorage.getItem("access");
};

export const removeToken = () => {
  localStorage.removeItem("access");
};

/**
 * @returns true if the token is valid and false if the token is invalid
 */

export const decodeToken = () => {
  const token = getToken();
  if (!token) return false;
  const isValidToken = jwt_decode(token, { header: true });
  if (isValidToken.type === "JWT" && isValidToken.alg === "HS256") return true;
  return false;
};

/**
 * @description insert the token in the header autorization Bearer of the request
 */

export const axiosInterceptor = () => {
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        deleteToken();
        window.location.href = "/";
      }
      return error;
    }
  );
};
