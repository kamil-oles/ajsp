export const ratesTableComponent = {
  bindings: {
    rates: '<',
    view: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentController {
    constructor(RatesTableDataService, RatesTableHeadersService, RatesTableSortService) {
      this.rtds = RatesTableDataService;
      this.rths = RatesTableHeadersService;
      this.rtss = RatesTableSortService;
    }

    icon = 'keyboard_arrow_up';

    icons = {
      ASC: 'keyboard_arrow_up',
      DESC: 'keyboard_arrow_down'
    };

    $onInit() {
      this.headers = this.rths.headers(this.view);
    }

    $onChanges(changes) {
      if (changes.rates.currentValue) {
        this.data = this.rtds.prepare(changes.rates.currentValue, this.view);
        this.sortBy = this.view === 'current' ? 'currency' : 'date';
        this.sortDirection = 'ASC';
      }
    }

    sort(code) {
      if (code === this.sortBy) {
        this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      }
      this.rtss.sort(this.data, code, this.sortDirection);
      this.icon = this.icons[this.sortDirection];
      this.sortBy = code;
    }
  }
};