export default class CountryApiService {
  constructor() {
    this.searchQuery = '';
    this.queryParams = '?fields=name,capital,population,coatOfArms,languages';
  }

  async fetchCountry() {
    try {
      const url = `https://restcountries.com/v3.1/name/${this.searchQuery}${this.queryParams}`;
      const response = await fetch(url);
      const country = await response.json();
      return country;
    } catch (err) {
      throw err;
    }
  }

  get query() {
    return this.searchQuery.trim();
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
