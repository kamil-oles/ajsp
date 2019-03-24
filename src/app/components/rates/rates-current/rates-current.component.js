export const RATES_CURRENT_COMPONENT = {
  bindings: { initialData: '<' },
  template: require('./rates-current.html'),
  controller: class RatesCurrentComponentCtrl {
    constructor(headers) {
      this.headers = headers.current;
    }
  }
};