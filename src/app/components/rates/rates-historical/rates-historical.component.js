export const ratesHistoricalComponent = {
  bindings: {
    lastWeekRates: '<'
  },
  template: require('./rates-historical.html'),
  controller: class RatesHistoricalComponentController {
    constructor($filter, $mdToast, $scope, ComponentsCurrenciesService, ComponentsHttpService) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.chs = ComponentsHttpService;
      this.filter = $filter;
      this.mdToast = $mdToast;
      this.scope = $scope;
    }

    $onInit() {
      this.scope.$emit('stateChange', 'historical');
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
        this.mdToast.show(
          this.mdToast.simple()
            .textContent(err.data)
            .parent(document.getElementById('toast-container'))
            .hideDelay(5000000)
            .position('top, right')
        );
      });
    }

    updateCode(data) {
      this.currency.code = data.code;
    }
  }
};