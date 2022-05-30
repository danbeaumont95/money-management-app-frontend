import { url } from "./url";
import axios from "axios";

const login = async (email: string, password: string) => {
  const res = await axios.post(`${url}/user/login`, {
    email,
    password
  });
  return res
};

const signUp = async (firstName: string, lastName: string, email: string, password: string, mobileNumber: number, username: string) => {
  const res = await axios.post(`${url}/user`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    username
  })
  return res
};

const getLinkToken = async (token: string) => {
  const res = await axios.get(`${url}/user/getLinkToken`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const exchangePublicTokenForAccesstoken = async (token: string, publicToken: string) => {
  const res = await axios.post(`${url}/user/exchangePublicToken`, {
    public_token: publicToken
  },{
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const UserService  = {
  login,
  signUp,
  getLinkToken,
  exchangePublicTokenForAccesstoken
}

export default UserService
