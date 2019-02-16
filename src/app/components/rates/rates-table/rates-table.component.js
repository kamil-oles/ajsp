export const ratesTableComponent = {
  bindings: {
    rates: '<',
    tableData: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentController {
    constructor(RatesTableDataService, RatesTableSortService) {
      this.rtds = RatesTableDataService;
      this.rtss = RatesTableSortService;
    }

    icon = 'keyboard_arrow_up';

    icons = {
      ASC: 'keyboard_arrow_up',
      DESC: 'keyboard_arrow_down'
    };

    $onChanges(changes) {
      const STATE = this.tableData.state;
      if (changes.rates.currentValue) {
        this.data = this.rtds.prepare(changes.rates.currentValue, STATE);
        this.sortBy = STATE === 'current' ? 'currency' : 'date';
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