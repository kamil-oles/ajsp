import templateUrl from './converter-rate.html';

export const converterRate = {
  bindings: {
    rateInfo: '<'
  },
  templateUrl,
  controller: class ConverterRateController {
    $onChanges(changes) {
      this.show = changes.rateInfo.currentValue.code !== null ? true : false;
    }
  }
};