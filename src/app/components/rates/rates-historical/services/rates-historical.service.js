import { RatesHistorical } from '../classes/rates-historical.class';

export class RatesHistoricalHttpService {
  constructor($filter, $http, endPoint) {
    this.filter = $filter;
    this.http = $http;
    this.url = endPoint;
  }

  getRates(code, start, end) {
    return this.http({
      method: 'GET',
      url: `${this.url}rates/c/${code}/${start}/${end}/`
    });
  }

  initialData(code) {
    const FROM = this.filter('date')(this.setDateFrom(), 'yyyy-MM-dd'),
      TO = this.filter('date')(new Date(), 'yyyy-MM-dd');
    if (code) {
      return this.getRates(code, FROM, TO).then(function prepareData(response) {
        return new RatesHistorical(FROM, response.data);
      });
    } else {
      return new RatesHistorical(FROM);
    }
  }

  setDateFrom() {
    const START = new Date();
    return new Date(START.setDate(START.getDate() - 7));
  }
}