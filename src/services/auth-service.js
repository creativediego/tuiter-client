import axios from 'axios';
import { processError } from './helpers';
const SECURITY_API = `${process.env.REACT_APP_API_URL}/auth`;

const api = axios.create({
  withCredentials: true,
});

export const register = (user) =>
  api
    .post(`${SECURITY_API}/register`, user)
    .then((response) => response.data)
    .catch((err) => err.response.data);

export const login = (user) =>
  api
    .post(`${SECURITY_API}/login`, user)
    .then((response) => {
      console.log('THE DATA', response.data);
      return response.data;
    })
    .catch((err) => err.response.data);

export const logout = (user) =>
  api
    .post(`${SECURITY_API}/logout`, user)
    .then((response) => response.data)
    .catch((err) => processError(err));

export const getProfile = () =>
  api
    .get(`${SECURITY_API}/profile`)
    .then((response) => {
      console.log('GET PROFILE RES', response.headers);
      return response.data;
    })
    .catch((err) => '');
