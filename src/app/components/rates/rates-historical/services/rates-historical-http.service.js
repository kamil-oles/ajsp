export class RatesHistoricalHttpService {
  constructor($http, base) {
    this.http = $http;
    this.url = base.url;
  }

  getRates(code, start, end) {
    return this.http({
      method: 'GET',
      url: `${this.url}rates/c/${code}/${start}/${end}/`
    });
  }
}