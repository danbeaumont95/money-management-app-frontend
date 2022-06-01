import axios from "axios";
import { url } from "./url";

const refreshToken = async (accessToken: any, refreshToken: any) => {

  const res = await axios.post(`${url}/user/refreshToken`, {}, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-refresh': `${refreshToken}`
    }
  });

  return res;
}

const TokenService = {
  refreshToken
};

export default TokenService
