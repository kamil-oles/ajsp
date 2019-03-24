import * as currencies from '../../data/currencies.json';

export const SELECT_COMPONENT = {
  bindings: {
    currency: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: class SelectComponentCtrl {
    constructor(eventEmitter) {
      this.eventEmitter = eventEmitter;
    }

    model = null;

    $onInit() {
      this.currencies = currencies.data;
    }

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