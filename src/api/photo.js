import {
  ACCESS_KEY,
} from './const';

const photoParams = new URLSearchParams('');
photoParams.append('client_id', ACCESS_KEY);
photoParams.append('per_page', 30);
photoParams.append('page', 1);

export const urlPhoto = photoParams.toString();
console.log(urlPhoto);
