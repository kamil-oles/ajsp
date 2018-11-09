export const selectComponent = {
  bindings: {
    currency: '<',
    onUpdateCode: '&'
  },
  template: require('./select.html'),
  controller: class SelectComponent {
    constructor(ComponentsCurrenciesService, EventEmitter) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.EventEmitter = EventEmitter;
    }

    $onChanges(changes) {
      if (changes.currency) {
        this.currency = Object.assign({}, changes.currency.currentValue);
      }
    }

    updateCode() {
      this.onUpdateCode(this.EventEmitter({ code: this.currency.code }));
    }
  }
};