import { url } from "./url";
import axios from "axios";

const login = async (email: string, password: string) => {
  const res = await axios.post(`${url}/user/login`, {
    email,
    password
  });
  return res
}

const UserService  = {
  login
}

export default UserService
