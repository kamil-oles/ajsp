import { Currency } from '../classes/converter-form.class';

export class ConverterFormStorageService {
  /* @ngInject */
  constructor(base) {
    this._currency = base.currency;
  }

  getData(key) {
    const DATA = JSON.parse(localStorage.getItem(key));
    if (DATA && key === 'first_currency') {
      return new Currency(DATA.code, DATA.value);
    } else if (DATA && key === 'second_currency') {
      return new Currency(DATA.code);
    } else if (!DATA && key === 'first_currency') {
      return new Currency('PLN', 1000);
    } else {
      return new Currency(this._currency);
    }
  }

  setData(first, second) {
    localStorage.setItem('first_currency', JSON.stringify(first));
    localStorage.setItem('second_currency', JSON.stringify(second));
  }
}