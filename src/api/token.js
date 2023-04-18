import {getCode} from './auth';
import {
  API_URL_TOKEN,
  SECRET_KEY,
  ACCESS_KEY,
  REDIRECT_URI,
} from './const';

const searchParamsToken = new URLSearchParams('');
searchParamsToken.append('client_id', ACCESS_KEY);
searchParamsToken.append('client_secret', SECRET_KEY);
searchParamsToken.append('redirect_uri', REDIRECT_URI);
searchParamsToken.append('code', getCode());
searchParamsToken.append('grant_type', 'authorization_code');

export const urlAuthToken = `${API_URL_TOKEN}?${searchParamsToken.toString()}`;

export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  if (localStorage.getItem('bearer')) {
    const token = localStorage.getItem('bearer');
    return token;
  }
};

