import * as currencies from '../../data/currencies.json';

export const SELECT_COMPONENT = {
  bindings: {
    currency: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: class SelectComponentCtrl {
    constructor(eventEmitter) {
      this._eventEmitter = eventEmitter;
    }

    model = null;

    $onInit() {
      this.currencies = currencies.data;
    }

    $onChanges(changes) {
      if (changes.currency) {
        this.model = angular.copy(changes.currency.currentValue);
      }
    }

    updateCode() {
      this.onUpdateCode(this._eventEmitter(this.model.code));
    }
  }
};