import angular from 'angular';
import templateUrl from './converter.html';
import { Currency } from './shared/converter-currency.model';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    constructor(ComponentsHttpService) {
      this.http = ComponentsHttpService;
    }

    $onInit() {
      this.currencyFirst = new Currency('PLN', '1000');
      this.currencySecond = new Currency('EUR');
    }

    calculate() {
      const first = this.currencyFirst,
        second = this.currencySecond,
        code = first.code !== 'PLN' ? first.code : second.code;
      this.http.rate(code).then(response => console.log(response.data));
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