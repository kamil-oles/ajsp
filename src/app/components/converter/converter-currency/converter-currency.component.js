import templateUrl from './converter-currency.html';
import { Currency } from '../shared/converter.model';

export const converterCurrencyComponent = {
  bindings: {
    currency: '<',
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
          currency: new Currency(this.currency.code, this.currency.value)
        })
      );
    }
  }
};