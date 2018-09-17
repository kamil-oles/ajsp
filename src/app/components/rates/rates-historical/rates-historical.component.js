import { DatepickerOptions } from './rates-historical-model';
import templateUrl from './rates-historical.html';

export const ratesHistoricalComponent = {
  bindings: {
    ratesFromLastWeek: '<'
  },
  templateUrl,
  controller: class RatesHistoricalComponentController {
    constructor(ComponentsCurrenciesService, RatesHistoricalHttpService, RatesSortService) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.rhhs = RatesHistoricalHttpService;
      this.rss = RatesSortService;
    }

    $onInit() {
      const min = new Date(2002, 0, 2);
      this.currency = this.ratesFromLastWeek ? this.ratesFromLastWeek.code : 'EUR';
      this.from = this.rhhs.setStartDate();
      this.to = new Date();
      this.options = new DatepickerOptions(this.to, min);
      this.rates = this.ratesFromLastWeek ? this.ratesFromLastWeek.rates : null;
    }

    getRates() {
      this.rhhs.rates(this.currency, this.from, this.to).then(response => {
        this.rates = response.data.rates;
        this.sortDirection = 'ASC';
      });
    }

    open(type) {
      const types = {
        from: () => this.openFrom = true,
        to: () => this.openTo = true
      };
      types[type]();
    }

    sort() {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      this.rss.sort(this.rates, 'effectiveDate', this.sortDirection);
    }
  }
};