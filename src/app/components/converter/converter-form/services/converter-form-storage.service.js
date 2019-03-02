import { Currency } from '../classes/converter-form.class';

export class ConverterFormStorageService {
  constructor(base) {
    this.currency = base.currency;
  }

  getData(key) {
    const DATA = JSON.parse(localStorage.getItem(key));
    if (DATA && key === 'first_currency') {
      return new Currency(DATA.code, DATA.value);
    } else if (DATA && key === 'second_currency') {
      return new Currency(DATA.code);
    } else if (!DATA && key === 'first_currency') {
      return new Currency('PLN', '1 000');
    } else {
      return new Currency(this.currency);
    }
  }
}