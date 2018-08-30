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
      const currency = data.currency;
      if (this.currencyFirst.code === currency.code) {
        this.currencyFirst.value = currency.value;
      } else {
        this.currencySecond.value = currency.value;
      }
    }
  }
};