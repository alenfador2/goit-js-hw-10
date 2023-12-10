import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_AE3tRoCk3AO4nehCmS2FOU4IHDHnSV7SlG1rrWDtlCukVbtyneYOT0Irmd37ccTz';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

errorInfo.style.display = 'none';
breedSelector.setAttribute('id', 'single');
function loading() {
  loader.innerText = '';
  loader.style.display = 'block';
}
function closeLoader() {
  loader.style.display = 'none';
}

fetchBreeds()
  .then(data => {
    loading();
    const html = data.map(
      breed => `<option value = "${breed.id}">${breed.name}</option>`
    );
    breedSelector.innerHTML = html;
    loader.style.display = 'none';
    closeLoader();
    // breedSelector = new SlimSelect({ select: '#single' });
  })
  .catch(error => {
    Notiflix.Report.failure(errorInfo.textContent);
    console.error(error);
  });

breedSelector.addEventListener('change', ev => {
  const breed = ev.target.value;
  fetchCatByBreed(breed)
    .then(cats => {
      const catArray = cats.map(cat => {
        console.log(JSON.stringify(cat));
        return `<img class = "image" src ="${cat.url}" width = "400px" heigth = "400px"></img><div class = "content"><h2>Cat name: ${cat.breeds[0].name}</h2><p class = "text">${cat.breeds[0].description}</p></br><p><b>Temperament: </b>${cat.breeds[0].temperament}</p></div>`;
      });
      catInfo.innerHTML = catArray.join('');
    })
    .catch(error => {
      Notiflix.Report.failure(errorInfo.textContent);
      console.error(error);
    });
});
