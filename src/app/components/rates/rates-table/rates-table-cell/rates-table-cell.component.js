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
      this._eventEmitter = eventEmitter;
    }

    sendIndex() {
      this.expandSubrow(this._eventEmitter(this.index));
    }
  }
};