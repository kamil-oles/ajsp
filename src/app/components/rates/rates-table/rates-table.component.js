class RatesTableComponentCtrl {
  /* @ngInject */
  constructor($filter, RatesTableSort) {
    this.filter = $filter;
    this._sortService = RatesTableSort;
  }

  icon = 'keyboard_arrow_up';
  sortDirection = 'ASC';

  $onInit() {
    this.columns.forEach(function setMinWidth(el) {
      if (el.minWidth) {
        el.minWidth = { 'min-width': `${el.minWidth}rem` };
      }
    });
    this.sortBy = this._findColumnToSortBy();
  }

  sort(prop) {
    if (prop === this.sortBy) {
      this.sortDirection = (this.sortDirection === 'ASC' ? 'DESC' : 'ASC');
    }
    this._sortService.sort(this.rows, prop, this.sortDirection);
    this.icon = `keyboard_arrow_${this.sortDirection === 'ASC' ? 'up' : 'down'}`;
    this.sortBy = prop;
  }

  _findColumnToSortBy() {
    const COLUMN = this.columns.find(function findCallback(element) {
      return element.sortedBy;
    });
    return (COLUMN ? COLUMN.prop : this.columns[0].prop);
  }
}

export const RATES_TABLE_COMPONENT = {
  bindings: {
    columns: '<',
    rows: '<'
  },
  template: require('./rates-table.html'),
  controller: RatesTableComponentCtrl
};