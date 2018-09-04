import templateUrl from './converter.html';
import { Currency } from './shared/converter-currency.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ConverterCalculateService) {
      this.calc = ConverterCalculateService;
    }

    $onInit() {
      this.currencyFirst = new Currency(true, 'PLN', '1000');
      this.currencySecond = new Currency(false, 'EUR');
    }

    calculate() {
      if (this.currencyFirst.code === 'PLN') {
        this.calc.buy(this.currencySecond.code, this.currencyFirst.value)
          .then(newData => this.currencySecond = newData);
      } else {
        this.calc.sell(this.currencyFirst.code, this.currencyFirst.value)
          .then(newData => this.currencySecond = newData);
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