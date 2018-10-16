import templateUrl from './converter-code.html';

export const converterCodeComponent = {
  bindings: {
    currency: '<',
    onUpdateCode: '&'
  },
  templateUrl,
  controller: class ConverterCodeComponent {
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