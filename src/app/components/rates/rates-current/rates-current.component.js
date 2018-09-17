import templateUrl from './rates-current.html';

export const ratesCurrentComponent = {
  bindings: {
    currentRates: '<'
  },
  templateUrl,
  controller: class RatesCurrentComponentController {
    constructor(RatesSortService) {
      this.rss = RatesSortService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
    }

    $onInit() {
      this.date = this.currentRates.effectiveDate;
      this.rates = this.currentRates.rates;
    }

    sort(type) {
      if (type === this.sortBy) {
        this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.sortDirection = 'ASC';
      }
      this.rss.sort(this.rates, type, this.sortDirection);
      this.sortBy = type;
    }
  }
};