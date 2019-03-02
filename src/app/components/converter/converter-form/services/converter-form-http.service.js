export class ConverterFormHttpService {
  constructor($http, base) {
    this.http = $http;
    this.url = base.url;
  }

  rate(code) {
    return this.http({
      method: 'GET',
      url: `${this.url}rates/c/${code}`,
    });
  }
}