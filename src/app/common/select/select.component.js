import * as currencies from '../../data/currencies.json';

class SelectComponentCtrl {
  /* @ngInject */
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
  }

  currencies = currencies.data;

  $onChanges(changes) {
    if (changes.currency) {
      this.model = angular.copy(changes.currency.currentValue);
    }
  }

  updateCode() {
    this.onUpdateCode(this._eventEmitter(this.model.code));
  }
}

export const SELECT_COMPONENT = {
  bindings: {
    currency: '<',
    emptyOption: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: SelectComponentCtrl
};