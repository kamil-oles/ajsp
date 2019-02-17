export const RATES_TABLE_HEADER_COMPONENT = {
  bindings: {
    header: '<',
    sortBy: '<',
    sortDirection: '<'
  },
  template: require('./rates-table-header.html'),
  controller: class RatesTableHeaderCtrl {
    icon = 'keyboard_arrow_up';

    icons = {
      ASC: 'keyboard_arrow_up',
      DESC: 'keyboard_arrow_down'
    };

    $onChanges(changes) {
      if (changes.sortDirection) {
        this.icon = this.icons[changes.sortDirection.currentValue];
      }
    }
  }
};