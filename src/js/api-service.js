export default class CountryApiService {
  constructor() {
    this.searchQuery = '';
    this.queryParams = '?fields=name,capital,population,coatOfArms,languages';
  }

  async fetchCountry() {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const url = `https://restcountries.com/v3.1/name/${this.searchQuery}${this.queryParams}`;
      const response = await fetch(url, { signal: signal });
      let isLoading = false;
      const modifiedUrl = `https://restcountries.com/v3.1/name/${this.searchQuery}${this.queryParams}`;
      if (response.status === 200) {
        isLoading = true;
      }
      const country = await response.json();
      if (isLoading && url === modifiedUrl) {
        console.log('Сервер відвовів 200 та запит НЕ змінился');
        isLoading = false;
        return country;
      } else {
        console.log('Сервер не встиг відвовісти 200 та/або запит змінился');
        controller.abort();
      }
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
