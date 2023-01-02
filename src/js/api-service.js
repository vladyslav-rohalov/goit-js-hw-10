export default class CountryApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountry() {
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,coatOfArms,languages`;
    return fetch(url)
      .then(response => response.json())
      .then(country => country);
  }

  get query() {
    return this.searchQuery.trim();
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
