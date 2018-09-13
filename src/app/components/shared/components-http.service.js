export class ComponentsHttpService {
  constructor($http) {
    this.http = $http;
  }

  currentRates() {
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/tables/c/'
    });
  }

  rate(code) {
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + code,
    });
  }
}