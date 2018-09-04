import { Currency } from './converter-currency.model';

export class ConverterCalculateService {
  constructor(ComponentsHttpService) {
    this.http = ComponentsHttpService;

    this.buy = (code, value) => {
      return this.http.rate(code).then(response => {
        const newValue = (value / response.data.rates[0].ask).toFixed(2);
        return new Currency(false, code, newValue);
      });
    };

    this.sell = (code, value) => {
      return this.http.rate(code).then(response => {
        const newValue = (value * response.data.rates[0].bid).toFixed(2);
        return new Currency(false, 'PLN', newValue);
      });
    };
  }
}