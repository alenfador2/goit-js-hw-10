import axios from 'axios';
import { fetchBreeds } from './js/cat-api';

const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then(data => {
  const html = data.map(
    breed => `<option value = "${breed.id}">${breed.name}</option>`
  );
  breedSelector.innerHTML = html;
});
