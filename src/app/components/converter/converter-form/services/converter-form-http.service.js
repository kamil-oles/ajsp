export class ConverterFormHttpService {
  /* @ngInject */
  constructor($http, base) {
    this._http = $http;
    this._url = base.url;
  }

  rate(code) {
    return this._http({
      method: 'GET',
      url: `${this._url}rates/c/${code}`,
    });
  }
}