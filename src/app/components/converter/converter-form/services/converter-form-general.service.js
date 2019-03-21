import { Currency, Rate } from '../classes/converter-form.class';

export class ConverterFormGeneralService {
  constructor(ConverterFormFormatter) {
    this._formatter = ConverterFormFormatter;
  }

  setData(data, code) {
    data.rate = data.rate.replace('.', ',');
    this.updateRate(this._eventEmitter(new Rate(code, data.denomination, data.rate)));
    return data.currency;
  }

  swap(first, second) {
    const STASH = Object.assign({}, first),
      CURRENCY_FIRST = new Currency(
        second.code,
        this._formatter.toNumber(second.value)
      ),
      CURRENCY_SECOND = new Currency(
        STASH.code,
        this._formatter.format(STASH.value)
      );
    return [CURRENCY_FIRST, CURRENCY_SECOND];
  }
}