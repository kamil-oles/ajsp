import templateUrl from './rates-table.html';

export const ratesTableComponent = {
  bindings: {
    headers: '<',
    rates: '<'
  },
  templateUrl,
  controller: class RatesTableComponentController {
    constructor(ComponentsSortService) {
      this.css = ComponentsSortService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
    }

    // $onChanges(changes) {
    //   if (changes.currency) {
    //     this.currency = Object.assign({}, changes.currency.currentValue);
    //   }
    // }

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