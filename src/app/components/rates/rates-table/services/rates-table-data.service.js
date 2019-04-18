export class RatesTableDataService {
  prepare(array, view) {
    return array.map((el, i, arr) => this._rows(el, i, arr, view, this._format));
  }

  _calculateDelta(el, i, arr, t) {
    return ((el[t] - arr[i - 1][t]) / arr[i - 1][t] * 100);
  }

  _format(data, rounding) {
    return `${data.toFixed(rounding).replace('.', ',')}${rounding === 2 ? '%' : ''}`;
  }

  _rows(el, i, arr, view, formatter) {
    if (view === 'current') {
      return {
        code: el.code,
        currency: el.currency,
        bid: this._format(el.bid, 4),
        ask: this._format(el.ask, 4)
      };
    } else {
      return {
        date: el.effectiveDate,
        bid: this._format(el.bid, 4),
        bidDelta: {
          number: (i !== 0 ? this._calculateDelta(el, i, arr, 'bid') : 0),
          get string() {
            return (i !== 0 ? formatter(this.number, 2) : '-');
          }
        },
        ask: this._format(el.ask, 4),
        askDelta: {
          number: (i !== 0 ? this._calculateDelta(el, i, arr, 'ask') : 0),
          get string() {
            return (i !== 0 ? formatter(this.number, 2) : '-');
          }
        }
      };
    }
  }
}