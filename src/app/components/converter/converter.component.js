import { Rate } from '../shared/classes/components-classes';
import templateUrl from './converter.html';

export const converterComponent = {
  templateUrl,
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