import { Currency, Results } from '../classes/converter-form.class';

export class ConverterFormCalculateService {
  constructor(ConverterFormValidation, ConverterFormHttp) {
    this.http = ConverterFormHttp;
    this.validation = ConverterFormValidation;
  }

  calculate(priceType, value, rate) {
    if (priceType === 'ask') {
      return (value / rate).toFixed(2);
    } else {
      return (value * rate).toFixed(2);
    }
  }

  check(code, value, buy = false) {
    return this.http.rate(code).then(response => {
      const PRICE_TYPE = (buy ? 'ask' : 'bid'),
        RATE = +response.data.rates[0][PRICE_TYPE],
        NEW_VALUE = this.calculate(PRICE_TYPE, value, RATE),
        SECOND_CURRENCY_CODE = (buy ? code : 'PLN'),
        NEW_VALUE_FORMATTED = this.validation.formatting(NEW_VALUE),
        CURRENCY = new Currency(SECOND_CURRENCY_CODE, NEW_VALUE_FORMATTED),
        DENOMINATION = this.setDenomination(code);
      return new Results(CURRENCY, DENOMINATION, (RATE * DENOMINATION).toFixed(4));
    });
  }

  setDenomination(code) {
    return ((code === 'HUF' || code === 'JPY') ? 100 : 1);
  }
}