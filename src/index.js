import './css/styles.css';
import Notiflix from 'notiflix';
import counrtyCardTmpl from './country-card.hbs';
import countryListTmpl from './country-list.hbs';
import CountryApiService from './js/api-service';
import refs from './js/refs';

const debounce = require('lodash.debounce');
const Handlebars = require('handlebars');
const DEBOUNCE_DELAY = 300;

const countryApiService = new CountryApiService();

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
function onFormInput(e) {
  countryApiService.query = e.target.value;
  countryApiService.fetchCountry().then(checkQuery);
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

Handlebars.registerHelper('formatProp', function (prop) {
  let arr = [];
  for (let val of Object.values(prop)) {
    arr.push(` ${val}`);
  }
  return arr;
});

Handlebars.registerHelper('formatIfNone', function (prop) {
  if (prop !== '') {
    return prop;
  } else return 'https://mainfacts.com/media/images/coats_of_arms/ua.svg';
});
