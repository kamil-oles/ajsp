class FilterComponentCtrl {
  /* @ngInject */
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
  }

  $onInit() {
    this.currency = this.config.currency;
    this.from = this.config.from;
    this.max = new Date();
    this.min = new Date(2002, 0, 2);
    this.to = this.max;
  }

  sendParams() {
    this.getData(this._eventEmitter({
      currency: this.currency,
      from: this.from,
      to: this.to
    }));
  }

  updateCode(code) {
    this.currency.code = code;
  }
}

export const FILTER_COMPONENT = {
  bindings: {
    config: '<',
    getData: '&'
  },
  template: require('./filter.html'),
  controller: FilterComponentCtrl
};