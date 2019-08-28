export class ConverterFormStorageService {
  /* @ngInject */
  constructor(base, ConverterFormGeneral) {
    this._currency = base.currency;
    this._general = ConverterFormGeneral;
  }

  getData(key) {
    const DATA = JSON.parse(localStorage.getItem(key));
    if (DATA && key === 'first_currency') {
      return this._general.currency(DATA.code, DATA.value);
    } else if (DATA && key === 'second_currency') {
      return this._general.currency(DATA.code);
    } else if (!DATA && key === 'first_currency') {
      return this._general.currency('PLN', 1000);
    } else {
      return this._general.currency(this._currency);
    }
  }

  setData(first, second) {
    localStorage.setItem('first_currency', JSON.stringify(first));
    localStorage.setItem('second_currency', JSON.stringify(second));
  }
}