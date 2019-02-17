export const RATES_HISTORICAL_COMPONENT = {
  bindings: {
    currencies: '<',
    initialData: '<',
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
        code: this.initialData.data ? this.initialData.data.code : 'EUR'
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
      this.chs.ratesHistorical(this.currency.code, START, END).then(response => {
        this.rates = response.data.rates;
      }, error => {
        this.scope.$emit('toast', error.data);
      });
    }

    updateCode(data) {
      this.currency.code = data.code;
    }
  }
};