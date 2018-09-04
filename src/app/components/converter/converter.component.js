import templateUrl from './converter.html';
import { Currency } from './shared/converter-currency.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ComponentsHttpService) {
      this.http = ComponentsHttpService;
    }

    $onInit() {
      this.currencyFirst = new Currency(true, 'PLN', '1000');
      this.currencySecond = new Currency(false, 'EUR');
    }

    calculate() {
      if (this.currencyFirst.code === 'PLN') {
        this.http.rate(this.currencySecond.code).then(response => {
          const value = (this.currencyFirst.value / response.data.rates[0].ask).toFixed(2);
          this.currencySecond = new Currency(false, this.currencySecond.code, value);
        });
      } else {
        this.http.rate(this.currencyFirst.code).then(response => {
          const value = (this.currencyFirst.value * response.data.rates[0].bid).toFixed(2);
          this.currencySecond = new Currency(false, 'PLN', value);
        });
      }
    }

    exchange() {
      const stash = Object.assign({}, this.currencyFirst);
      this.currencyFirst = new Currency(true, this.currencySecond.code, this.currencySecond.value);
      this.currencySecond = new Currency(false, stash.code, stash.value);
    }

    update(data) {
      const currency = data.currency;
      if (currency.active) {
        this.currencyFirst = Object.assign({}, currency);
      } else {
        this.currencySecond = Object.assign({}, currency);
      }
    }
  }
};