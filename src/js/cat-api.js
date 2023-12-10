import axios from 'axios';
import Notiflix from 'notiflix';
const errorInfo = document.querySelector('.error');

axios.defaults.headers.common['x-api-key'] =
  'live_AE3tRoCk3AO4nehCmS2FOU4IHDHnSV7SlG1rrWDtlCukVbtyneYOT0Irmd37ccTz';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    if (response.status !== 200) {
      Notiflix.Report.failure(errorInfo.textContent);
    }
    return response.data;
  });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
