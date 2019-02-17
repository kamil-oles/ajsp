export const RATES_HISTORICAL_COMPONENT = {
  bindings: {
    currencies: '<',
    lastWeekRates: '<',
    table: '<'
  },
  template: require('./rates-historical.html'),
  controller: class RatesHistoricalComponentCtrl {
    constructor($filter, $scope, ComponentsHttpService) {
      this.chs = ComponentsHttpService;
      this.filter = $filter;
      this.scope = $scope;
    }

    $onInit() {
      this.currency = {
        code: this.lastWeekRates.data ? this.lastWeekRates.data.code : 'USD'
      };
      this.from = this.lastWeekRates.from;
      this.max = new Date();
      this.min = new Date(2002, 0, 2);
      this.rates = this.lastWeekRates.data ? this.lastWeekRates.data.rates : null;
      this.to = this.max;
    }

    getRates() {
      const start = this.filter('date')(this.from, 'yyyy-MM-dd'),
        end = this.filter('date')(this.to, 'yyyy-MM-dd');
      this.chs.ratesHistorical(this.currency.code, start, end).then(response => {
        this.rates = response.data.rates;
      }, err => {
        this.scope.$emit('toast', err.data);
      });
    }

    updateCode(data) {
      this.currency.code = data.code;
    }
  }
};