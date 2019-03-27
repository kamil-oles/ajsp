import { Currency } from '../classes/converter-form.class';

export class ConverterFormGeneralService {
  constructor(ConverterFormFormatter) {
    this._formatter = ConverterFormFormatter;
  }

  setData(data, code) {
    this.updateRate(this._eventEmitter({
      code: code,
      denomination: data.denomination,
      rate: data.rate
    }));
    return data.currency;
  }

  swap(first, second) {
    const STASH = angular.copy(first),
      CURRENCY_FIRST = new Currency(second.code, this._formatter.toNumber(second.value)),
      CURRENCY_SECOND = new Currency(STASH.code, this._formatter.format(STASH.value));
    return [CURRENCY_FIRST, CURRENCY_SECOND];
  }
}