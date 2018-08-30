import templateUrl from './converter.html';
import { Currency } from './shared/converter.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    $onInit() {
      this.currencies = [];
      this.currencies.push(new Currency('PLN', '1000'), new Currency('EUR'));
    }

    exchange() {
      const stash = Object.assign({}, this.currencies[0]);
      this.currencies[0] = Object.assign({}, this.currencies[1]);
      this.currencies[1] = Object.assign({}, stash);
    }

    update(data) {
      let currency = data.currency;
      for (let i = 0; i < 2; i++) {
        let el = this.currencies[i];
        if (el.code === currency.code) {
          el.value = currency.value;
          break;
        }
      }
    }
  }
};