export class RatesHistoricalHttpService {
  constructor($filter, $http) {
    this.filter = $filter;
    this.http = $http;
  }

  rates(code, from, to) {
    const start = this.filter('date')(from, 'yyyy-MM-dd'),
      end = this.filter('date')(to, 'yyyy-MM-dd');
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/rates/c/' +
        code + '/' +
        start + '/' +
        end + '/'
    });
  }
}