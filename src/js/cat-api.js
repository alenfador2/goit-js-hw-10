import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AE3tRoCk3AO4nehCmS2FOU4IHDHnSV7SlG1rrWDtlCukVbtyneYOT0Irmd37ccTz';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/breeds';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

export { fetchBreeds };
