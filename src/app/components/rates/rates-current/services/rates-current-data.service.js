export class RatesCurrentDataService {
  /* @ngInject */
  constructor($q, $rootScope, RatesCurrentHttp) {
    this._http = RatesCurrentHttp;
    this._q = $q;
    this._root = $rootScope;
  }

  rates() {
    const SESSION_RATES = JSON.parse(sessionStorage.getItem('rates_current'));
    if (!SESSION_RATES) {
      const DEFERRED = this._q.defer();
      this._http.getRates().then(response => {
        const DATA = this._prepareData(this._removeXdr(response.data[0]));
        sessionStorage.setItem('rates_current', JSON.stringify(DATA));
        DEFERRED.resolve(DATA);
      }, error => {
        this._root.$broadcast('toast', error.data);
        DEFERRED.reject();
      });
      return DEFERRED.promise;
    } else {
      return SESSION_RATES;
    }
  }

  _format(data) {
    return `${data.toFixed(4).replace('.', ',')}`;
  }

  _prepareData(response) {
    return {
      effectiveDate: response.effectiveDate,
      rates: response.rates.map(el => {
        return {
          code: el.code,
          currency: el.currency,
          bid: this._format(el.bid),
          ask: this._format(el.ask)
        };
      })
    };
  }

  _removeXdr(response) {
    const INDEX = response.rates.findIndex(function findIndexCallback(el) {
      return el.code === 'XDR';
    });
    response.rates.splice(INDEX, 1);
    return response;
  }
}