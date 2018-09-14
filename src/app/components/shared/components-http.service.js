export class ComponentsHttpService {
  constructor($http) {
    this.http = $http;
  }

  rate(code) {
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + code,
    });
  }
}