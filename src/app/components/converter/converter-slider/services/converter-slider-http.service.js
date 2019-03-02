export class ConverterSliderHttpService {
  constructor($http, base) {
    this.http = $http;
    this.url = base.url;
  }

  rates(code) {
    return this.http({
      method: 'GET',
      url: `${this.url}rates/c/${code}/last/2`,
    });
  }
}