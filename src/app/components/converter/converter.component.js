import { Currency } from '../shared/classes/components-classes';
import templateUrl from './converter.html';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ConverterCalculateService, ConverterValidationService) {
      this.ccs = ConverterCalculateService;
      this.cvs = ConverterValidationService;
      this.rate = null;
    }

    $onInit() {
      this.currencyFirst = this.getLocalData('first');
      this.currencySecond = this.getLocalData('second');
    }

    calculate() {
      if (this.currencyFirst.code === 'PLN') {
        console.log(this.cvs.formatting(this.currencyFirst.value));
        this.ccs.buy(this.currencySecond.code, this.currencyFirst.value)
          .then(results => this.setData(results, this.currencySecond.code));
      } else {
        this.ccs.sell(this.currencyFirst.code, this.currencyFirst.value)
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

    // formatting(v) {
    //   const value = this.validation(v);
    //   const index = value.indexOf('.');
    //   let fraction = null,
    //     integer;
    //   if (index !== -1) {
    //     const fractionIndex = index + 1;
    //     fraction = value.slice(fractionIndex);
    //     integer = value.slice(0, index);
    //   } else {
    //     integer = value;
    //   }
    //   const len = integer.length - 1,
    //     spaces = Math.floor(len / 3);
    //   if (spaces) {
    //     let array = integer.split('').reverse();
    //     for (let i = 3; i < array.length; i = i + 4) {
    //       array.splice(i, 0, ' ');
    //     }
    //     integer = array.reverse().join('');
    //   }
    //   if (fraction) {
    //     return integer + ',' + fraction;
    //   } else {
    //     return integer;
    //   }
    // }

    // validation(value) {
    //   let vString = value;
    //   if (/[^0-9,.\s]/.test(vString)) {
    //     return false;
    //   }
    //   vString = vString.replace(/^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
    //   const index = vString.search(/\./);
    //   let vArray = [];
    //   if (index !== -1) {
    //     vArray = vString.split('.');
    //     vString = vArray.join('');
    //     vArray = vString.split('');
    //     vArray.splice(index, 0, '.');
    //   }
    //   if (index === 0) {
    //     vArray.reverse();
    //     vArray.push(0);
    //     vArray.reverse();
    //   }
    //   return index !== -1 ? vArray.join('') : vString;
    // }
  }
};