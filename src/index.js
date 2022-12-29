import './css/styles.css';
import Notiflix from 'notiflix';
import counrtyCardTmpl from './country-card.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  insertCountryList: document.querySelector('.country-list'),
  insertCountryCard: document.querySelector('.country-info'),
};

let countryName = '';

refs.input.addEventListener('input', onFormInput);

function onFormInput(e) {
  countryName = e.target.value;
  console.log(e);

  const request = fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  console.log(request);
  request
    .then(response => response.json())
    .then(country => {
      console.log(country);
      checkQuantity(country);
      insetCountry(country);
    })
    .catch(error => console.log(error));
}

function checkQuantity(value) {
  if (value.length > 9) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function insetCountry(value) {
  const markup = counrtyCardTmpl(value[0]);
  refs.insertCountryCard.innerHTML = markup;
}
