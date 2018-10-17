import { Currency, Results } from '../../../shared/classes/components-classes';

export class ConverterFormCalculateService {
  constructor(ComponentsHttpService, ConverterFormValidationService) {
    this.cfvs = ConverterFormValidationService;
    this.http = ComponentsHttpService;
  }

  check(code, value, buy = false) {
    return this.http.rate(code).then(response => {
      const priceType = buy ? 'ask' : 'bid',
        rate = +response.data.rates[0][priceType],
        newValue = this.calculate(priceType, value, rate),
        secondCurrencyCode = buy ? code : 'PLN',
        newValueFormatted = this.cfvs.formatting(newValue),
        currency = new Currency(secondCurrencyCode, newValueFormatted),
        denomination = this.setDenomination(code);
      return new Results(currency, denomination, (rate * denomination).toFixed(4));
    });
  }

  calculate(priceType, value, rate) {
    const methods = {
      ask: () => (value / rate).toFixed(2),
      bid: () => (value * rate).toFixed(2)
    };
    return methods[priceType]();
  }

  setDenomination(code) {
    if (code === 'HUF' || code === 'JPY') {
      return 100;
    } else {
      return 1;
    }
  }
}