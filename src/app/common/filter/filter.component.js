class FilterComponentCtrl {
  /* @ngInject */
  constructor($filter, eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._filter = $filter;
  }

  $onInit() {
    this.currency = angular.copy(this.config.currency);
    this.from = this.config.from;
    this.max = new Date();
    this.min = new Date(2002, 0, 2);
    this.to = this.max;
  }

  sendParams() {
    this.getData(this._eventEmitter({
      currency: this.currency,
      from: this._filter('date')(this.from, 'yyyy-MM-dd'),
      to: this._filter('date')(this.to, 'yyyy-MM-dd')
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