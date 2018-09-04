import { Currency } from './converter-currency.model';

export class ConverterCalculateService {
  constructor(ComponentsHttpService) {
    this.http = ComponentsHttpService;
  }

  buy(code, value) {
    return this.http.rate(code).then(response => {
      const rate = +response.data.rates[0].ask,
        newValue = (value / rate).toFixed(2),
        denomination = this.setDenomination(code);
      return {
        currency: new Currency(false, code, newValue),
        denomination: denomination,
        rate: rate * denomination
      };
    });
  }

  sell(code, value) {
    return this.http.rate(code).then(response => {
      const rate = +response.data.rates[0].bid,
        newValue = (value * rate).toFixed(2),
        denomination = this.setDenomination(code);
      return {
        currency: new Currency(false, 'PLN', newValue),
        denomination: denomination,
        rate: rate * denomination
      };
    });
  }

  setDenomination(code) {
    if (code === 'HUF' || code === 'JPY') {
      return 100;
    } else {
      return 1;
    }
  }
}