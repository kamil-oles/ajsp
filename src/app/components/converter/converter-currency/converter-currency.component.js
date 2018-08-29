import templateUrl from './converter-currency.html';

export const converterCurrencyComponent = {
  bindings: {
    currency: '<',
    value: '<',
    onUpdate: '&'
  },
  templateUrl,
  controller: class ConverterCurrencyComponent {
    constructor(EventEmitter) {
      this.EventEmitter = EventEmitter;
    }

    update() {
      this.onUpdate(
        this.EventEmitter({
          currency: this.currency,
          value: this.value
        })
      );
    }
  }
};