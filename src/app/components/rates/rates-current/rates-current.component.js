import templateUrl from './rates-current.html';

export const ratesCurrentComponent = {
  bindings: {
    currentRates: '<'
  },
  templateUrl,
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
      console.log(this.headers);
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