export class RatesCurrentHttpService {
  constructor($http, base) {
    this.http = $http;
    this.url = base.url;
  }

  getRates() {
    return this.http({
      method: 'GET',
      url: `${this.url}tables/c/`
    });
  }
}