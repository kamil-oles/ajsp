import { DatepickerOptions } from '../../shared/classes/components-classes';
import templateUrl from './rates-historical.html';

export const ratesHistoricalComponent = {
  bindings: {
    lastWeekRates: '<'
  },
  templateUrl,
  controller: class RatesHistoricalComponentController {
    constructor(ComponentsCurrenciesService, ComponentsHttpService, ComponentsSortService) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.chs = ComponentsHttpService;
      this.css = ComponentsSortService;
    }

    $onInit() {
      const min = new Date(2002, 0, 2);
      this.currency = this.lastWeekRates.data ? this.lastWeekRates.data.code : 'EUR';
      this.from = this.lastWeekRates.from;
      this.to = new Date();
      this.options = new DatepickerOptions(this.to, min);
      this.rates = this.lastWeekRates.data ? this.lastWeekRates.data.rates : null;
    }

    getRates() {
      this.chs.ratesHistorical(this.currency, this.from, this.to).then(response => {
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
      this.css.sort(this.rates, 'effectiveDate', this.sortDirection);
    }
  }
};