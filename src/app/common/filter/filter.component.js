import { FilterParams } from './classes/filter.class';

class FilterComponentCtrl {
  /* @ngInject */
  constructor($filter, eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._filter = $filter;
  }

  $onInit() {
    this.currencies = [this.config.currency, { code: null }];
    this.from = this.config.from;
    this.label = this.config.comparison ? 'Waluta I' : 'Waluta';
    this.max = new Date();
    this.min = new Date(2002, 0, 2);
    this.to = this.config.to;
  }

  sendParams() {
    this.getData(this._eventEmitter(new FilterParams(
      this.currencies,
      this._filter('date')(this.from, 'yyyy-MM-dd'),
      this._filter('date')(this.to, 'yyyy-MM-dd')
    )));
  }

  updateCode(data) {
    this.currencies[data.id].code = data.value;
  }
}

export const FILTER_COMPONENT = {
  bindings: {
    block: '<',
    config: '<',
    getData: '&'
  },
  template: require('./filter.html'),
  controller: FilterComponentCtrl
};