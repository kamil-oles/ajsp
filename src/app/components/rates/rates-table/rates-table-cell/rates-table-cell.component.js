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
    constructor(eventEmitter) {
      this.eventEmitter = eventEmitter;
    }

    sendIndex() {
      this.expandSubrow(this.eventEmitter(this.index));
    }
  }
};