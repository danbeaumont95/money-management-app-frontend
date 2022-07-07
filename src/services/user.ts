/* eslint-disable no-param-reassign */
import axios from 'axios';
import { url } from './url';
import TokenService from './token';

const login = async (email: string, password: string) => {
  const res = await axios.post(`${url}/user/login`, {
    email,
    password,
  });
  return res;
};

const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mobileNumber: number,
  username: string,
) => {
  const res = await axios.post(`${url}/user`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    username,
  });
  return res;
};

const getLinkToken = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }
  const res = await axios.get(`${url}/user/getLinkToken`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const exchangePublicTokenForAccesstoken = async (token: string, publicToken: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.post(`${url}/user/exchangePublicToken`, {
    public_token: publicToken,
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const getLinkedAccounts = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }
  const res = await axios.get(`${url}/user/linkedAccounts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const getAllTransactions = async (token: string, time: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.get(`${url}/user/getTransactions/${time}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const getMyDetails = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.get(`${url}/user/getMe`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const updateMyDetails = async (
  token: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mobileNumber: number,
  username: string,
) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.patch(`${url}/user/updateMyDetails`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    username,
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const UserService = {
  login,
  signUp,
  getLinkToken,
  exchangePublicTokenForAccesstoken,
  getLinkedAccounts,
  getAllTransactions,
  getMyDetails,
  updateMyDetails,
};

export default UserService;
