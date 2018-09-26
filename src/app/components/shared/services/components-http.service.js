import { RatesHistorical } from '../classes/components-classes';

export class ComponentsHttpService {
  constructor($filter, $http) {
    this.filter = $filter;
    this.http = $http;
    this.url = 'http://api.nbp.pl/api/exchangerates/';
  }

  fetchCurrentRates() {
    return this.ratesCurrent().then(response => this.removeXdr(response.data[0]));
  }

  fetchHistoricalRates(code) {
    const from = this.setDateFrom(),
      to = new Date();
    if (code) {
      return this.ratesHistorical(code, from, to).then(response => {
        return new RatesHistorical(from, response.data);
      });
    } else {
      return new RatesHistorical(from);
    }
  }

  rate(code) {
    return this.http({
      method: 'GET',
      url: this.url + 'rates/c/' + code,
    });
  }

  ratesCurrent() {
    return this.http({
      method: 'GET',
      url: this.url + '/tables/c/'
    });
  }

  ratesFromLastWeek(code) {
    return this.http({
      method: 'GET',
      url: this.url + '/rates/c/' + code + '/last/5/'
    });
  }

  ratesHistorical(code, from, to) {
    const start = this.filter('date')(from, 'yyyy-MM-dd'),
      end = this.filter('date')(to, 'yyyy-MM-dd');
    return this.http({
      method: 'GET',
      url: this.url + '/rates/c/' +
        code + '/' +
        start + '/' +
        end + '/'
    });
  }

  removeXdr(response) {
    const len = response.rates.length;
    for (let i = 0; i < len; i++) {
      if (response.rates[i].code === 'XDR') {
        response.rates.splice(i, 1);
        break;
      }
    }
    return response;
  }

  setDateFrom() {
    const start = new Date();
    return start.setDate(start.getDate() - 7);
  }
}