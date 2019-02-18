export const RATES_TABLE_COMPONENT = {
  bindings: {
    rates: '<',
    tableData: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentCtrl {
    constructor(RatesTableDataService, RatesTableSortService) {
      this.rtds = RatesTableDataService;
      this.rtss = RatesTableSortService;
    }

    subrow = false;

    $onChanges(changes) {
      const STATE = this.tableData.state;
      if (changes.rates.currentValue) {
        this.data = this.rtds.prepare(changes.rates.currentValue, STATE);
        this.sortBy = (STATE === 'current' ? 'currency' : 'date');
        this.sortDirection = 'ASC';
      }
    }

    expandSubrow(index) {
      this.subrow = (index !== this.subrow ? index : null);
    }

    sort(code) {
      if (code === this.sortBy) {
        this.sortDirection = (this.sortDirection === 'ASC' ? 'DESC' : 'ASC');
      }
      this.rtss.sort(this.data, code, this.sortDirection);
      this.sortBy = code;
    }
  }
};