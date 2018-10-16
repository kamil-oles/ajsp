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
      this.ccs = ConverterFormCalculateService;
      this.currencyFirst;
      this.currencySecond;
      this.cvs = ConverterFormValidationService;
      this.EventEmitter = EventEmitter;
    }

    $onInit() {
      this.currencyFirst = Object.assign({}, this.currencyFirstParent);
      this.currencySecond = Object.assign({}, this.currencySecondParent);
    }

    calculate() {
      const vObject = this.cvs.formatting(this.currencyFirst.value, true);
      let vNumber;
      if (vObject) {
        vNumber = vObject.model;
        this.currencyFirst = new Currency(this.currencyFirst.code, vObject.view);
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
      this.currencyFirst = new Currency(this.currencySecond.code, this.currencySecond.value);
      this.currencySecond = new Currency(stash.code, stash.value);
    }

    updateCode(data) {
      this[this.currencyFirst.code === 'PLN' ? 'currencySecond' : 'currencyFirst'].code = data.code;
    }

    setData(data, code) {
      this.currencySecond = data.currency;
      this.updateRate(
        this.EventEmitter({
          rateInfo: new Rate(code, data.denomination, data.rate)
        })
      );
    }

    // validation(form) {
    //   console.log(form);
    //   form.value.$setValidity('validationError', false);
    // }
  }
};