import templateUrl from './converter.html';
import { Currency } from './shared/converter.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    $onInit() {
      this.currencyFirst = new Currency('PLN', '1000');
      this.currencySecond = new Currency('EUR');
    }

    exchange() {
      const stash = Object.assign({}, this.currencyFirst);
      this.currencyFirst = Object.assign({}, this.currencySecond);
      this.currencySecond = Object.assign({}, stash);
    }

    update(data) {
      console.log(data);
    }
  }
};