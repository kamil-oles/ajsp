import { DatepickerOptions } from '../../shared/classes/components-classes';
import templateUrl from './rates-historical.html';

export const ratesHistoricalComponent = {
  bindings: {
    lastWeekRates: '<'
  },
  templateUrl,
  controller: class RatesHistoricalComponentController {
    constructor(
      $filter,
      ComponentsCurrenciesService,
      ComponentsHttpService,
      ComponentsSortService
    ) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.chs = ComponentsHttpService;
      this.css = ComponentsSortService;
      this.filter = $filter;
      this.regex = /^\d{4}-\d{2}-\d{2}$/;
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
      const start = this.filter('date')(this.from, 'yyyy-MM-dd'),
        end = this.filter('date')(this.to, 'yyyy-MM-dd');
      if (this.regex.test(start) && this.regex.test(end)) {
        this.chs.ratesHistorical(this.currency, start, end).then(response => {
          this.rates = response.data.rates;
          this.sortDirection = 'ASC';
        });
      } else {
        console.log('zły format');
      }
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