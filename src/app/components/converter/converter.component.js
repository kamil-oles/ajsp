import angular from 'angular';
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
      const stash = angular.copy(this.currencyFirst);
      this.currencyFirst = angular.copy(this.currencySecond);
      this.currencySecond = angular.copy(stash);
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