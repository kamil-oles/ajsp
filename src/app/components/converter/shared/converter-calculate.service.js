import { Currency, Results } from './converter.model';

export class ConverterCalculateService {
  constructor(ComponentsHttpService) {
    this.http = ComponentsHttpService;
  }

  buy(code, value) {
    return this.http.rate(code).then(response => {
      const rate = +response.data.rates[0].ask,
        currency = new Currency(false, code, (value / rate).toFixed(2)),
        denomination = this.setDenomination(code);
      return new Results(currency, denomination, rate * denomination);
    });
  }

  sell(code, value) {
    return this.http.rate(code).then(response => {
      const rate = +response.data.rates[0].bid,
        currency = new Currency(false, 'PLN', (value * rate).toFixed(2)),
        denomination = this.setDenomination(code);
      return new Results(currency, denomination, rate * denomination);
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