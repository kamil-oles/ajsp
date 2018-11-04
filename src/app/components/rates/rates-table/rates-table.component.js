export const ratesTableComponent = {
  bindings: {
    headers: '<',
    rates: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentController {
    constructor(ComponentsSortService, RatesTableDataService) {
      this.css = ComponentsSortService;
      this.icon = 'keyboard_arrow_up';
      this.rtds = RatesTableDataService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
      this.icons = {
        ASC: 'keyboard_arrow_up',
        DESC: 'keyboard_arrow_down'
      };
    }

    $onChanges(changes) {
      this.data = this.rtds.prepare(changes.rates.currentValue);
      // if (changes.currency) {
      //   this.currency = Object.assign({}, changes.currency.currentValue);
      // }
    }

    sort(code) {
      if (code === this.sortBy) {
        this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      }
      this.css.sort(this.data, code, this.sortDirection);
      this.icon = this.icons[this.sortDirection];
      this.sortBy = code;
    }
  }
};