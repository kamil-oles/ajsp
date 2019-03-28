import { Currency } from '../classes/converter-form.class';

export class ConverterFormGeneralService {
  constructor(ConverterFormFormatter) {
    this._formatter = ConverterFormFormatter;
  }

  _regex = /^\d{1,3}$|^\d{1,3},\d{2}$|^(\d{1,3}\s)*\d{3}$|^(\d{1,3}\s)*\d{3},\d{2}$/;

  processValue(model) {
    if (!this._regex.test(model.$viewValue)) {
      model.$processModelValue();
    }
  }

  swap(first, second) {
    const STASH = angular.copy(first),
      CURRENCY_FIRST = new Currency(second.code, this._formatter.toNumber(second.value)),
      CURRENCY_SECOND = new Currency(STASH.code, this._formatter.format(STASH.value));
    return [CURRENCY_FIRST, CURRENCY_SECOND];
  }
}