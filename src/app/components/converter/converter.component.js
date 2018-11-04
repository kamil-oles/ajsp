import { Rate } from '../shared/classes/components-classes';

export const converterComponent = {
  template: require('./converter.html'),
  controller: class ConverterComponentController {
    constructor(ConverterLocalStorageService) {
      this.clss = ConverterLocalStorageService;
      this.rateInfo = new Rate();
      this.show = false;
    }

    $onInit() {
      this.currencyFirst = this.clss.getData('first');
      this.currencySecond = this.clss.getData('second');
    }

    updateRate(data) {
      this.rateInfo = data.rateInfo;
      this.show = true;
    }
  }
};