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

  ratesFromLastWeek(code) {
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + code + '/last/5/'
    });
  }

  setStartDate() {
    const start = new Date();
    return start.setDate(start.getDate() - 7);
  }
}