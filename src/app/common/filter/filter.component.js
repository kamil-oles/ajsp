import { FilterParams } from './classes/filter.class';

class FilterComponentCtrl {
  /* @ngInject */
  constructor(CommonDate, eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._date = CommonDate;
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
      this._date.format(this.from, false),
      this._date.format(this.to, false)
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