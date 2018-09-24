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
      this.currencyFirst = this.getLocalData('first');
      this.currencySecond = this.getLocalData('second');
    }

    calculate() {
      if (this.currencyFirst.code === 'PLN') {
        console.log(this.validation(this.currencyFirst.value));
        this.calc.buy(this.currencySecond.code, this.currencyFirst.value)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.calc.sell(this.currencyFirst.code, this.currencyFirst.value)
          .then(results => this.setData(results, this.currencyFirst.code));
      }
      localStorage.setItem('first', JSON.stringify(this.currencyFirst));
      localStorage.setItem('second', JSON.stringify(this.currencySecond));
    }

    exchange() {
      const stash = Object.assign({}, this.currencyFirst);
      this.currencyFirst = new Currency(true, this.currencySecond.code, this.currencySecond.value);
      this.currencySecond = new Currency(false, stash.code, stash.value);
    }

    getLocalData(key) {
      const value = localStorage.getItem(key);
      if (value) {
        const local = JSON.parse(value),
          currencyModels = {
            first: () => new Currency(local.active, local.code, local.value),
            second: () => new Currency(local.active, local.code)
          };
        return currencyModels[key]();
      } else {
        const currencyModels = {
          first: () => new Currency(true, 'PLN', 1000),
          second: () => new Currency(false, 'EUR')
        };
        return currencyModels[key]();
      }
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

    validation(value) {
      let vString = value;
      if (/[^0-9,.\s]/.test(vString)) {
        return false;
      }
      vString = vString.replace(/^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
      const index = vString.search(/\./);
      let vArray = [];
      if (index !== -1) {
        vArray = vString.split('.');
        vString = vArray.join('');
        vArray = vString.split('');
        vArray.splice(index, 0, '.');
      }
      if (index === 0) {
        vArray.reverse();
        vArray.push(0);
        vArray.reverse();
      }
      return index !== -1 ? Number(vArray.join('')) : Number(vString);
    }
  }
};