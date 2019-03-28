export class RatesTableDataService {
  prepare(array, view) {
    return array.map(el => {
      return this._rows(el, view);
    });
  }

  _format(number) {
    return String(number.toFixed(4)).replace('.', ',');
  }

  _rows(el, view) {
    if (view === 'current') {
      return {
        code: el.code,
        currency: el.currency,
        bid: this._format(el.bid),
        ask: this._format(el.ask)
      };
    } else {
      return {
        date: el.effectiveDate,
        bid: this._format(el.bid),
        ask: this._format(el.ask)
      };
    }
  }
}