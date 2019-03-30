class RatesTableHeaderCtrl {
  icon = 'keyboard_arrow_up';
  _icons = {
    ASC: 'keyboard_arrow_up',
    DESC: 'keyboard_arrow_down'
  };

  $onChanges(changes) {
    if (changes.sortDirection) {
      this.icon = this._icons[changes.sortDirection.currentValue];
    }
  }
}

export const RATES_TABLE_HEADER_COMPONENT = {
  bindings: {
    header: '<',
    sortBy: '<',
    sortDirection: '<'
  },
  template: require('./rates-table-header.html'),
  controller: RatesTableHeaderCtrl
};