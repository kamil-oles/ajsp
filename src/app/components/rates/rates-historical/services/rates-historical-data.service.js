import { RatesHistorical } from '../classes/rates-historical.class';

export class RatesHistoricalDataService {
  constructor($filter, base, RatesHistoricalHttp) {
    this.baseCode = base.currency;
    this.filter = $filter;
    this.http = RatesHistoricalHttp;
  }

  initialData(code) {
    const FROM = this.filter('date')(this._setDateFrom(), 'yyyy-MM-dd'),
      SESSION_DATA = JSON.parse(sessionStorage.getItem('rates_historical')),
      TO = this.filter('date')(new Date(), 'yyyy-MM-dd');
    if (code) {
      return this.http.getRates(code, FROM, TO).then(function prepareData(response) {
        const RESPONSE = response.data,
          DATA = new RatesHistorical(RESPONSE.code, FROM, RESPONSE);
        sessionStorage.setItem('rates_historical', JSON.stringify(DATA));
        return DATA;
      });
    } else if (SESSION_DATA) {
      return SESSION_DATA;
    } else {
      return new RatesHistorical(this.baseCode, FROM);
    }
  }

  _setDateFrom() {
    const START = new Date();
    return new Date(START.setDate(START.getDate() - 7));
  }
}