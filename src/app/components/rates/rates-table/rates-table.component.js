export const RATES_TABLE_COMPONENT = {
  bindings: {
    rates: '<',
    tableData: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentCtrl {
    constructor($scope, RatesTableDataService, RatesTableSortService) {
      this.rtds = RatesTableDataService;
      this.rtss = RatesTableSortService;
      this.scope = $scope;
    }

    loader = false;
    subrow = null;

    $onInit() {
      this.scope.$on('loader', (event, loader) => {
        this.loader = loader;
      });
    }

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
      this.subrow = null;
      this.rtss.sort(this.data, code, this.sortDirection);
      this.sortBy = code;
    }
  }
};