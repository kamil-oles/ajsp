export const RATES_TABLE_CELL_COMPONENT = {
  bindings: {
    expandSubrow: '&',
    index: '<',
    key: '<',
    subrow: '<',
    value: '<'
  },
  template: require('./rates-table-cell.html'),
  controller: class RatesTableCellComponentCtrl {
    constructor(EventEmitter) {
      this.eventEmitter = EventEmitter;
    }

    sendIndex() {
      this.expandSubrow(this.eventEmitter(this.index));
    }
  }
};