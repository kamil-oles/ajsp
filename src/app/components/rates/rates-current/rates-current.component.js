class RatesCurrentComponentCtrl {
  /* @ngInject */
  constructor(headers) {
    this.headers = headers.current;
  }
}

export const RATES_CURRENT_COMPONENT = {
  bindings: { initialData: '<' },
  template: require('./rates-current.html'),
  controller: RatesCurrentComponentCtrl
};