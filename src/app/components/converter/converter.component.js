import { Currency, Rate } from '../shared/classes/components-classes';
import templateUrl from './converter.html';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(
      ConverterCalculateService,
      ConverterLocalStorageService,
      ConverterValidationService
    ) {
      this.ccs = ConverterCalculateService;
      this.clss = ConverterLocalStorageService;
      this.cvs = ConverterValidationService;
      this.rateInfo = new Rate();
    }

    $onInit() {
      this.currencyFirst = this.clss.getData('first');
      this.currencySecond = this.clss.getData('second');
    }

    calculate() {
      const vObject = this.cvs.formatting(this.currencyFirst.value, true);
      let vNumber;
      if (vObject) {
        vNumber = vObject.model;
        this.currencyFirst = new Currency(true, this.currencyFirst.code, vObject.view);
      } else {
        console.log('złe dane');
        return;
      }
      if (this.currencyFirst.code === 'PLN') {
        this.ccs.check(this.currencySecond.code, vNumber, true)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.ccs.check(this.currencyFirst.code, vNumber)
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