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
      if (this.currencyFirst.code === 'PLN') {
        this.http.rate(this.currencySecond.code).then(response => {
          const value = (this.currencyFirst.value / response.data.rates[0].ask).toFixed(2);
          this.currencySecond = new Currency(this.currencySecond.code, value);
        });
      } else {
        this.http.rate(this.currencyFirst.code).then(response => {
          const value = (this.currencyFirst.value * response.data.rates[0].bid).toFixed(2);
          this.currencySecond = new Currency('PLN', value);
        });
      }
    }

    exchange() {
      const stash = angular.copy(this.currencyFirst);
      this.currencyFirst = angular.copy(this.currencySecond);
      this.currencySecond = angular.copy(stash);
    }

    update(data) {
      const currency = data.currency;
      if (this.currencyFirst.code === currency.code) {
        this.currencyFirst = angular.copy(currency);
      } else {
        this.currencySecond = angular.copy(currency);
      }
    }
  }
};