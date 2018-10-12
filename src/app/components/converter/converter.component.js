import { Currency, Rate } from '../shared/classes/components-classes';
import templateUrl from './converter.html';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ConverterCalculateService, ConverterValidationService) {
      this.ccs = ConverterCalculateService;
      this.cvs = ConverterValidationService;
      this.rateInfo = new Rate();
    }

    $onInit() {
      this.currencyFirst = this.getLocalData('first');
      this.currencySecond = this.getLocalData('second');
    }

    calculate() {
      const vObject = this.cvs.formatting(this.currencyFirst.value);
      let vNumber;
      if (vObject) {
        vNumber = vObject.model;
        this.currencyFirst = new Currency(true, this.currencyFirst.code, vObject.view);
      } else {
        console.log('złe dane');
        return;
      }
      if (this.currencyFirst.code === 'PLN') {
        this.ccs.buy(this.currencySecond.code, vNumber)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.ccs.sell(this.currencyFirst.code, vNumber)
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
      this.rateInfo = new Rate(code, data.denomination, data.rate);
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