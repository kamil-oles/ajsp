import templateUrl from './converter.html';

export const converterComponent = {
  templateUrl,
  controller: class ConverterComponentController {
    $onInit() {
      this.currencyFirst = 'PLN';
      this.currencySecond = 'EUR';
      this.valueFirst = '1000';
      this.valueSecond = null;
    }

    update(data) {
      console.log(data);
    }
  }
};