import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelector = document.querySelector('.breed-select');
const selectContainer = document.querySelector('.select-container');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_AE3tRoCk3AO4nehCmS2FOU4IHDHnSV7SlG1rrWDtlCukVbtyneYOT0Irmd37ccTz';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

errorInfo.style.display = 'none';
selectContainer.style.display = 'none';
breedSelector.setAttribute('id', 'single');
loader.innerText = '';
function loading() {
  // loader.innerText = '';
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
    closeLoader();
    new SlimSelect({
      select: '#single',
      settings: { placeholderText: 'Select your cat' },
    });
    selectContainer.style.display = 'block';
  })
  .catch(error => {
    Notiflix.Report.failure(errorInfo.textContent);
    console.error(error);
  })
  .finally(() => {
    console.log('fetchBreeds has ended');
  });

breedSelector.addEventListener('change', ev => {
  catInfo.style.display = 'none';
  loading();
  const breed = ev.target.value;
  fetchCatByBreed(breed)
    .then(cats => {
      setTimeout(() => {
        closeLoader();
        const catArray = cats.map(cat => {
          console.log(JSON.stringify(cat));
          return `<img class = "image" src ="${cat.url}" width = "400" height = '400'></img><div class = "content"><h2 class = "header">Cat name: ${cat.breeds[0].name}</h2><p class = "text">${cat.breeds[0].description}</p><p class = "temp"><b>Temperament: </b>${cat.breeds[0].temperament}</p></div>`;
        });
        catInfo.innerHTML = catArray.join('');
        catInfo.style.display = 'block';
      }, 1000);
    })
    .catch(error => {
      Notiflix.Report.failure(errorInfo.textContent);
      console.error(error);
    });
});
