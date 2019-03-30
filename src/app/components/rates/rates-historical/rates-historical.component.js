import { RatesHistorical } from './classes/rates-historical.class';

class RatesHistoricalComponentCtrl {
  /* @ngInject */
  constructor($filter, $scope, headers, RatesHistoricalHttp) {
    this.headers = headers.historical;
    this._filter = $filter;
    this._http = RatesHistoricalHttp;
    this._scope = $scope;
  }

  blockLoader = true;

  $onInit() {
    this.currency = {
      code: this.initialData.currency
    };
    this.from = this.initialData.from;
    this.max = new Date();
    this.min = new Date(2002, 0, 2);
    this.rates = this.initialData.data ? this.initialData.data.rates : null;
    this.to = this.max;
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this.blockLoader ? loader : false);
    });
  }

  getRates() {
    this.blockLoader = false;
    const START = this._filter('date')(this.from, 'yyyy-MM-dd'),
      END = this._filter('date')(this.to, 'yyyy-MM-dd');
    this._http.getRates(this.currency.code, START, END).then(response => {
      const DATA = response.data;
      sessionStorage.setItem(
        'rates_historical',
        JSON.stringify(new RatesHistorical(DATA.code, START, DATA))
      );
      this.rates = DATA.rates;
      this.blockLoader = true;
    }, error => {
      this._scope.$emit('toast', error.data);
      this.blockLoader = true;
    });
  }

  updateCode(code) {
    this.currency.code = code;
  }
}

export const RATES_HISTORICAL_COMPONENT = {
  bindings: { initialData: '<' },
  template: require('./rates-historical.html'),
  controller: RatesHistoricalComponentCtrl
};