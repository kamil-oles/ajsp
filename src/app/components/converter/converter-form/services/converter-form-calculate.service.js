import { Currency } from '../classes/converter-form.class';

export class ConverterFormCalculateService {
  constructor(ConverterFormFormatter, ConverterFormHttp) {
    this._http = ConverterFormHttp;
    this._formatter = ConverterFormFormatter;
  }

  check(code, value, buy = false) {
    return this._http.rate(code).then(response => {
      const PRICE_TYPE = (buy ? 'ask' : 'bid'),
        RATE = +response.data.rates[0][PRICE_TYPE],
        NEW_VALUE = this._calculate(PRICE_TYPE, value, RATE);
      return {
        currency: new Currency((buy ? code : 'PLN'), this._formatter.format(NEW_VALUE)),
        denomination: this._setDenomination(code),
        get rate() {
          return String((RATE * this.denomination).toFixed(4)).replace('.', ',');
        }
      };
    });
  }

  _calculate(priceType, value, rate) {
    if (priceType === 'ask') {
      return (value / rate).toFixed(2);
    } else {
      return (value * rate).toFixed(2);
    }
  }

  _setDenomination(code) {
    return ((code === 'HUF' || code === 'JPY') ? 100 : 1);
  }
}