import templateUrl from './rates-current.html';

export const ratesCurrentComponent = {
  bindings: {
    currentRates: '<'
  },
  templateUrl,
  controller: class RatesCurrentComponentController {
    $onInit() {
      this.date = this.currentRates.effectiveDate;
      this.rates = this.currentRates.rates;
    }
  }
};