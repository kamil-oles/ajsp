import { TableRowCurrent, TableRowHistorical } from '../classes/rates-table.class';

export class RatesTableDataService {
  format(number) {
    return String(number.toFixed(4)).replace('.', ',');
  }

  prepare(array, view) {
    return array.map(el => {
      return this.rows(el, view);
    });
  }

  rows(el, view) {
    if (view === 'current') {
      return new TableRowCurrent(this.format(el.bid), this.format(el.ask), el.code, el.currency);
    } else {
      return new TableRowHistorical(this.format(el.bid), this.format(el.ask), el.effectiveDate);
    }
  }
}