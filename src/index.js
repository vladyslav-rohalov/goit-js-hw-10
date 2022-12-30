import './css/styles.css';
import Notiflix from 'notiflix';
import counrtyCardTmpl from './country-card.hbs';
import countryListTmpl from './country-list.hbs';
const debounce = require('lodash.debounce');
const Handlebars = require('handlebars');

const DEBOUNCE_DELAY = 300;
let conditions = false;
let countryName = '';

const refs = {
  input: document.querySelector('#search-box'),
  insertCountryList: document.querySelector('.country-list'),
  insertCountryCard: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  countryName = e.target.value;
  countryName.trim();
  if (countryName) {
    onFetch(countryName);
  } else {
    refs.insertCountryCard.innerHTML = '';
  }
}

function onFetch(countryName) {
  const request = fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,coatOfArms,languages`
  );
  request
    .then(response => response.json())
    .then(country => {
      console.log(country);
      checkObjectLength(country);
      insretCountryCard(country);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('"Oops, there is no country with that name"');
    });
}

function checkObjectLength(value) {
  refs.insertCountryList.innerHTML = '';
  refs.insertCountryCard.innerHTML = '';
  if (value.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    conditions = false;
  } else if (value.length > 2 && value.length <= 10) {
    insertCountryList(value);
    conditions = false;
  } else {
    conditions = true;
  }
}

Handlebars.registerHelper('formatProp', function (prop) {
  let arr = [];
  for (let val of Object.values(prop)) {
    arr.push(val);
  }
  return arr;
});

Handlebars.registerHelper('formatIfNone', function (prop) {
  if (prop !== '') {
    console.log(prop);
    return prop;
  } else return 'https://mainfacts.com/media/images/coats_of_arms/ua.svg';
});

function insretCountryCard(value) {
  if (conditions === true) {
    const markup = counrtyCardTmpl(value[0]);
    refs.insertCountryCard.innerHTML = markup;
  }
}

function insertCountryList(value) {
  console.log(value);

  const markup = countryListTmpl(value);
  refs.insertCountryList.innerHTML = markup;
}
