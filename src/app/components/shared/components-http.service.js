export class ComponentsHttpService {
  constructor($http) {
    this.rate = function (code) {
      return $http({
        method: 'GET',
        url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + code,
      });
    };
  }
}