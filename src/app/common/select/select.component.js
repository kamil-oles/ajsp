export const SELECT_COMPONENT = {
  bindings: {
    currency: '<',
    currencies: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: class SelectComponentCtrl {
    constructor(EventEmitter) {
      this.eventEmitter = EventEmitter;
    }

    $onChanges(changes) {
      if (changes.currency) {
        this.currency = Object.assign({}, changes.currency.currentValue);
      }
    }

    updateCode() {
      this.onUpdateCode(this.eventEmitter({ code: this.currency.code }));
    }
  }
};