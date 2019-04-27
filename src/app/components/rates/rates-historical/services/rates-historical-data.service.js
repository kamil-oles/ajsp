import { RatesHistorical } from '../classes/rates-historical.class';

export class RatesHistoricalDataService {
  /* @ngInject */
  constructor($filter, $q, $rootScope, base, ComponentsDate, RatesHistoricalHttp) {
    this._baseCurrency = base.currency;
    this._filter = $filter;
    this._http = RatesHistoricalHttp;
    this._q = $q;
    this._root = $rootScope;
    this._setDate = ComponentsDate;
  }

  initData(code) {
    const FROM = this._filter('date')(this._setDate.setDateFrom(7), 'yyyy-MM-dd'),
      SESSION_DATA = JSON.parse(sessionStorage.getItem('rates_historical')),
      TO = this._filter('date')(new Date(), 'yyyy-MM-dd');
    if (code) {
      const DEFERRED = this._q.defer();
      this._http.getRates(code, FROM, TO).then(
        response => {
          const CODE = response.data.code,
            RATES = this.prepare(response.data.rates),
            DATA = new RatesHistorical(CODE, FROM, TO, RATES);
          this.save(DATA);
          DEFERRED.resolve(DATA);
        },
        error => {
          this._root.$broadcast('toast', error.data);
          DEFERRED.reject();
        });
      return DEFERRED.promise;
    } else if (SESSION_DATA) {
      return SESSION_DATA;
    } else {
      return new RatesHistorical(this._baseCurrency, FROM, TO);
    }
  }

  prepare(array) {
    return array.map((el, i, arr) => this._rows(el, i, arr));
  }

  save(data) {
    sessionStorage.setItem('rates_historical', JSON.stringify(data));
  }

  _calculateDelta(el, i, arr, t) {
    return ((el[t] - arr[i - 1][t]) / arr[i - 1][t] * 100);
  }

  _rows(el, i, arr) {
    return {
      date: el.effectiveDate,
      bid: el.bid,
      bidDelta: (i !== 0 ? this._calculateDelta(el, i, arr, 'bid') : null),
      ask: el.ask,
      askDelta: (i !== 0 ? this._calculateDelta(el, i, arr, 'ask') : null)
    };
  }
}