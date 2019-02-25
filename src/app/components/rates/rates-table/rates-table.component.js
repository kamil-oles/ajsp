export const RATES_TABLE_COMPONENT = {
  bindings: {
    rates: '<',
    tableData: '<'
  },
  template: require('./rates-table.html'),
  controller: class RatesTableComponentCtrl {
    constructor($scope, $transitions, RatesTableDataService, RatesTableSortService) {
      this.rtds = RatesTableDataService;
      this.rtss = RatesTableSortService;
      this.scope = $scope;
      this.transitions = $transitions;
    }

    loader = false;
    subrow = null;

    $onInit() {
      this.transitions.onBefore({
        from: 'appRates.historical',
        to: 'appRates.current'
      }, () => {
        this.blockLoader = true;
      });
      this.scope.$on('loader', (event, loader) => {
        this.loader = !this.blockLoader ? loader : false;
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