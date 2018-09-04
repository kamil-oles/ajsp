import templateUrl from './converter.html';
import { Currency } from './shared/converter.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ConverterCalculateService) {
      this.calc = ConverterCalculateService;
      this.rate = null;
    }

    $onInit() {
      this.currencyFirst = new Currency(true, 'PLN', '1000');
      this.currencySecond = new Currency(false, 'EUR');
    }

    calculate() {
      if (this.currencyFirst.code === 'PLN') {
        this.calc.buy(this.currencySecond.code, this.currencyFirst.value)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.calc.sell(this.currencyFirst.code, this.currencyFirst.value)
          .then(results => this.setData(results, this.currencyFirst.code));
      }
    }

    exchange() {
      const stash = Object.assign({}, this.currencyFirst);
      this.currencyFirst = new Currency(true, this.currencySecond.code, this.currencySecond.value);
      this.currencySecond = new Currency(false, stash.code, stash.value);
    }

    setData(data, code) {
      this.currencySecond = data.currency;
      this.code = code;
      this.denomination = data.denomination;
      this.rate = data.rate;
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