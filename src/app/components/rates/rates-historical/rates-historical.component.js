import { RatesHistorical } from './classes/rates-historical.class';

export const RATES_HISTORICAL_COMPONENT = {
  bindings: {
    currencies: '<',
    initialData: '<',
    table: '<'
  },
  template: require('./rates-historical.html'),
  controller: class RatesHistoricalComponentCtrl {
    constructor($filter, $scope, RatesHistoricalHttp) {
      this.filter = $filter;
      this.http = RatesHistoricalHttp;
      this.scope = $scope;
    }

    $onInit() {
      this.currency = {
        code: this.initialData.currency.code
      };
      this.from = this.initialData.from;
      this.max = new Date();
      this.min = new Date(2002, 0, 2);
      this.rates = this.initialData.data ? this.initialData.data.rates : null;
      this.to = this.max;
    }

    getRates() {
      const START = this.filter('date')(this.from, 'yyyy-MM-dd'),
        END = this.filter('date')(this.to, 'yyyy-MM-dd');
      this.http.getRates(this.currency.code, START, END).then(response => {
        const DATA = response.data;
        sessionStorage.setItem(
          'rates_historical',
          JSON.stringify(new RatesHistorical(DATA.code, START, DATA))
        );
        this.rates = DATA.rates;
      }, error => {
        this.scope.$emit('toast', error.data);
      });
    }

    updateCode(data) {
      this.currency.code = data.code;
    }
  }
};