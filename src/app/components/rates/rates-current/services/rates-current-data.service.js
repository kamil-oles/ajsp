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
        const DATA = this._removeXdr(response.data[0]);
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

  _removeXdr(response) {
    response.rates.every(function searchForXdr(element, index) {
      if (element.code === 'XDR') {
        response.rates.splice(index, 1);
        return false;
      }
      return true;
    });
    return response;
  }
}