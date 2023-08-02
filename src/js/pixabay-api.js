import axios from 'axios';

export const test = 'pixabay-api';

const API_KEY = '38609084-88594d1851ef50d5ff8367fa3';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImagesByName(name) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      image_type: 'photos',
      orientation: 'horizontal',
      safesearch: 'true',
      q: name,
    },
  });
}
