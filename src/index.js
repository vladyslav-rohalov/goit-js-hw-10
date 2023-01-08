import './css/styles.css';
import './js/hb';
import Notiflix from 'notiflix';
import counrtyCardTmpl from './country-card.hbs';
import countryListTmpl from './country-list.hbs';
import CountryApiService from './js/api-service';
import { refs } from './js/refs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const countryApiService = new CountryApiService();

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  countryApiService.query = e.target.value;
  if (countryApiService.query !== '') {
    countryApiService.fetchCountry().then(checkQuery);
  }
}

function checkQuery(value) {
  clearMurkup();
  if (value.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (value.length > 2 && value.length <= 10) {
    countryApiService.fetchCountry().then(insertCountryList);
  } else {
    countryApiService.fetchCountry().then(insretCountryCard).catch(queryError);
  }
}

function insretCountryCard(value) {
  const markup = counrtyCardTmpl(value[0]);
  refs.insertCountryCard.innerHTML = markup;
}

function insertCountryList(value) {
  const markup = countryListTmpl(value);
  refs.insertCountryList.innerHTML = markup;
}

function clearMurkup() {
  refs.insertCountryList.innerHTML = '';
  refs.insertCountryCard.innerHTML = '';
}

function queryError() {
  Notiflix.Notify.failure('"Oops, there is no country with that name"');
}
