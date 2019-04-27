import * as columns from '../../../data/tables.json';

class RatesCurrentComponentCtrl {
  /* @ngInject */
  constructor(headers) {
    this.headers = headers.current;
  }

  $onInit() {
    this.columns = angular.copy(columns.data.current);
  }
}

export const RATES_CURRENT_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-current.html'),
  controller: RatesCurrentComponentCtrl
};