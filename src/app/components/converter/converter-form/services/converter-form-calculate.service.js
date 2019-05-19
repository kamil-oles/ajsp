import { Currency } from '../classes/converter-form.class';

export class ConverterFormCalculateService {
  /* @ngInject */
  constructor(ConverterFormFormatter) {
    this._formatter = ConverterFormFormatter;
  }

  setData(code, value, response, buy) {
    const PRICE_TYPE = (buy ? 'ask' : 'bid'),
      RATE = +response.data.rates[0][PRICE_TYPE],
      NEW_VALUE = this._calculate(PRICE_TYPE, value, RATE);
    return this._setResults(code, buy, RATE, NEW_VALUE);
  }

  _calculate(priceType, value, rate) {
    return (priceType === 'ask' ? (value / rate) : (value * rate)).toFixed(2);
  }

  _setDenomination(code) {
    return ((code === 'HUF' || code === 'JPY') ? 100 : 1);
  }

  _setResults(code, buy, rate, newValue) {
    return {
      currency: new Currency((buy ? code : 'PLN'), this._formatter.format(newValue)),
      denomination: this._setDenomination(code),
      get rate() {
        return (rate * this.denomination).toFixed(4).replace('.', ',');
      }
    };
  }
}