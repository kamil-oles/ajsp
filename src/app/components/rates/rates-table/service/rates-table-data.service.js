import { TableRow } from '../../../shared/classes/components-classes';

export class RatesTableDataService {
  format(number) {
    return String(number.toFixed(4)).replace('.', ',');
  }

  prepare(array) {
    return array.map(el => {
      return new TableRow(this.format(el.bid), this.format(el.ask), null, el.code, el.currency);
    });
  }
}