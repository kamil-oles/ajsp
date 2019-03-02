export class ConverterSliderDataService {
  prepareData(data) {
    return {
      change: this._change(data.rates),
      code: data.code,
      rate: this._prepareString(data.rates[1].ask),
    };
  }

  _change(rates) {
    const RESULT = rates.reduce(function reducer(acc, curr) {
      return curr.ask - acc;
    }, 0).toFixed(4);
    if (RESULT > 0) {
      return 'up';
    } else if (RESULT < 0) {
      return 'down';
    } else {
      return 'no_changes';
    }
  }

  _prepareString(number) {
    return String(number.toFixed(4)).replace(/\./, ',');
  }
}