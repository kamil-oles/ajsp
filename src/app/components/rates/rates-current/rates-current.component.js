class RatesCurrentComponentCtrl {
  /* @ngInject */
  constructor(headers) {
    this.headers = headers.current;
  }
}

export const RATES_CURRENT_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-current.html'),
  controller: RatesCurrentComponentCtrl
};