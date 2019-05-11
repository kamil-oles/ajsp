export class ChartsHttpService {
  /* @ngInject */
  constructor($http, base) {
    this._http = $http;
    this._url = base.url;
  }

  getRates(code, start, end) {
    return this._http({
      method: 'GET',
      url: `${this._url}rates/a/${code}/${start}/${end}/`
    });
  }
}