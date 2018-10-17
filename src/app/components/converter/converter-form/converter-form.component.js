import { Currency, Rate } from '../../shared/classes/components-classes';
import templateUrl from './converter-form.html';

export const converterFormComponent = {
  templateUrl,
  bindings: {
    currencyFirstParent: '<',
    currencySecondParent: '<',
    updateRate: '&'
  },
  controller: class ConverterFormComponentController {
    constructor(ConverterFormCalculateService, ConverterFormValidationService, EventEmitter) {
      this.cfcs = ConverterFormCalculateService;
      this.cfvs = ConverterFormValidationService;
      this.currencyFirst;
      this.currencySecond;
      this.EventEmitter = EventEmitter;
    }

    $onInit() {
      this.currencyFirst = Object.assign({}, this.currencyFirstParent);
      this.currencySecond = Object.assign({}, this.currencySecondParent);
    }

    calculate(form) {
      const value = this.cfvs.validation(this.currencyFirst.value, form);
      if (!value) {
        this.currencyFirst.value = value;
        return;
      }
      const number = this.cfvs.toNumber(value);
      this.currencyFirst = new Currency(this.currencyFirst.code, this.cfvs.formatting(number));
      if (this.currencyFirst.code === 'PLN') {
        this.cfcs.check(this.currencySecond.code, number, true)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.cfcs.check(this.currencyFirst.code, number)
          .then(results => this.setData(results, this.currencyFirst.code));
      }
      localStorage.setItem('first', JSON.stringify(this.currencyFirst));
      localStorage.setItem('second', JSON.stringify(this.currencySecond));
    }

    exchange() {
      const stash = Object.assign({}, this.currencyFirst);
      this.currencyFirst = new Currency(this.currencySecond.code, this.currencySecond.value);
      this.currencySecond = new Currency(stash.code, stash.value);
    }

    updateCode(data) {
      this[this.currencyFirst.code === 'PLN' ? 'currencySecond' : 'currencyFirst'].code = data.code;
    }

    setData(data, code) {
      this.currencySecond = data.currency;
      this.updateRate(
        this.EventEmitter({ rateInfo: new Rate(code, data.denomination, data.rate) })
      );
    }
  }
};