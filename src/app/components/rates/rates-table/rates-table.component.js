class RatesTableComponentCtrl {
  /* @ngInject */
  constructor($filter, RatesTableSort) {
    this.filter = $filter;
    this._sortService = RatesTableSort;
  }

  $onChanges(changes) {
    if (changes.rows.currentValue) {
      this.sortBy = this._findColumnToSortBy();
      this.sortDirection = 'ASC';
      this.icon = 'keyboard_arrow_up';
    }
  }

  $onInit() {
    this.columns.forEach(function setMinWidth(el) {
      if (el.minWidth) {
        el.minWidth = { 'flex-basis': `${el.minWidth}rem` };
      }
    });
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
    const COLUMN = this.columns.find(element => element.sortBy);
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