export class ConverterFormGeneralService {
  /* @ngInject */
  constructor(ConverterFormFormatter) {
    this._formatter = ConverterFormFormatter;
  }

  _regex = /^\d{1,3}$|^\d{1,3},\d{2}$|^(\d{1,3}\s)*\d{3}$|^(\d{1,3}\s)*\d{3},\d{2}$/;

  currency(code, value = null) {
    return {
      code: code,
      value: value
    };
  }

  processValue(model) {
    if (!this._regex.test(model.$viewValue)) {
      model.$processModelValue();
    }
  }

  swap(first, second) {
    const STASH = angular.copy(first),
      CURRENCY_FIRST = this.currency(second.code, this._formatter.toNumber(second.value)),
      CURRENCY_SECOND = this.currency(STASH.code, this._formatter.format(STASH.value));
    return [CURRENCY_FIRST, CURRENCY_SECOND];
  }
}