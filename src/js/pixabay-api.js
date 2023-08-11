import axios from 'axios';

const API_KEY = '38609084-88594d1851ef50d5ff8367fa3';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImagesByName(name) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      image_type: 'photos',
      orientation: 'horizontal',
      q: name,
      page: 1,
      per_page: 40,
    },
  });
}

export function fetchMoreImages(name, pageCount) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      image_type: 'photos',
      orientation: 'horizontal',
      q: name,
      page: pageCount,
      per_page: 40,
    },
  });
}
