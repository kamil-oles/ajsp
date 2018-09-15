import { DatepickerOptions } from './rates-historical-model';
import templateUrl from './rates-historical.html';

export const ratesHistoricalComponent = {
  bindings: {
    ratesFromLastWeek: '<'
  },
  templateUrl,
  controller: class RatesHistoricalComponentController {
    constructor(ComponentsCurrenciesService, RatesHistoricalHttpService) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.rhhs = RatesHistoricalHttpService;
    }

    $onInit() {
      const min = new Date(2002, 0, 2);
      this.currency = 'EUR';
      this.from = this.rhhs.setStartDate();
      this.to = new Date();
      this.options = new DatepickerOptions(this.to, min);
      this.rates = this.ratesFromLastWeek;
    }

    getRates() {
      this.rhhs.rates(this.currency, this.from, this.to).then(response => {
        this.rates = response.data.rates;
      });
    }

    open(type) {
      const types = {
        from: () => this.openFrom = true,
        to: () => this.openTo = true
      };
      types[type]();
    }
  }
};