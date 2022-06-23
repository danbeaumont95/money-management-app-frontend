/* eslint-disable import/extensions */
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { url } from './url';

const refreshTokenFunction = async (accessToken: any, refreshToken: any) => {
  const res = await axios.post(`${url}/user/refreshToken`, {}, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-refresh': `${refreshToken}`,
    },
  });

  return res;
};

const TokenService = {
  refreshToken: refreshTokenFunction,
};

export default TokenService;
