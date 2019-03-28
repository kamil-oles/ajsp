export class RatesCurrentHttpService {
  constructor($http, base) {
    this._http = $http;
    this._url = base.url;
  }

  getRates() {
    return this._http({
      method: 'GET',
      url: `${this._url}tables/c/`
    });
  }
}