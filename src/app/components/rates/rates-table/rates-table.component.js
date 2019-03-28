export const RATES_TABLE_COMPONENT = {
  bindings: {
    rates: '<',
    tableData: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentCtrl {
    constructor(RatesTableData, RatesTableSort) {
      this._rtds = RatesTableData;
      this._rtss = RatesTableSort;
    }

    subrow = null;

    $onChanges(changes) {
      const STATE = this.tableData.state;
      if (changes.rates.currentValue) {
        this.data = this._rtds.prepare(changes.rates.currentValue, STATE);
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
      this.subrow = null;
      this._rtss.sort(this.data, code, this.sortDirection);
      this.sortBy = code;
    }
  }
};