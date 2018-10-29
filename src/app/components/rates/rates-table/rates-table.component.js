import templateUrl from './rates-table.html';

export const ratesTableComponent = {
  bindings: {
    headers: '<',
    rates: '<'
  },
  templateUrl,
  controller: class RatesTableComponentController {
    constructor(ComponentsSortService, RatesTableDataService) {
      this.css = ComponentsSortService;
      this.rtds = RatesTableDataService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
    }

    $onChanges(changes) {
      this.data = this.rtds.prepare(changes.rates.currentValue);
      // if (changes.currency) {
      //   this.currency = Object.assign({}, changes.currency.currentValue);
      // }
    }

    sort(type) {
      if (type === this.sortBy) {
        this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.sortDirection = 'ASC';
      }
      this.css.sort(this.data, type, this.sortDirection);
      this.sortBy = type;
    }
  }
};