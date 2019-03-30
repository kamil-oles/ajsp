export class ConverterSliderHttpService {
  /* @ngInject */
  constructor($http, base) {
    this._http = $http;
    this._url = base.url;
  }

  rates(code) {
    return this._http({
      method: 'GET',
      url: `${this._url}rates/c/${code}/last/2`,
    });
  }
}