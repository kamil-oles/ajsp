export const ratesCurrentComponent = {
  bindings: {
    currentRates: '<'
  },
  template: require('./rates-current.html'),
  controller: class RatesCurrentComponentController {
    constructor(ComponentsSortService, RatesCurrentHeadersService) {
      this.css = ComponentsSortService;
      this.rchs = RatesCurrentHeadersService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
    }

    $onInit() {
      this.date = this.currentRates.effectiveDate;
      this.headers = this.rchs.headers();
      this.rates = this.currentRates.rates;
    }

    sort(type) {
      if (type === this.sortBy) {
        this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.sortDirection = 'ASC';
      }
      this.css.sort(this.rates, type, this.sortDirection);
      this.sortBy = type;
    }
  }
};