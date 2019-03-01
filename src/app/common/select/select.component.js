export const SELECT_COMPONENT = {
  bindings: {
    currency: '<',
    currencies: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: class SelectComponentCtrl {
    constructor(eventEmitter) {
      this.eventEmitter = eventEmitter;
    }

    model = null;

    $onChanges(changes) {
      if (changes.currency) {
        this.model = Object.assign({}, changes.currency.currentValue);
      }
    }

    updateCode() {
      this.onUpdateCode(this.eventEmitter(this.model.code));
    }
  }
};