class HeaderComponentCtrl {
  /* @ngInject */
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
  }

  repo = 'https://github.com/kamil-oles/Currency_converter-AngularJS';

  emitChange() {
    this.onViewChange(this._eventEmitter());
  }
}

export const HEADER_COMPONENT = {
  bindings: { onViewChange: '&' },
  template: require('./header.html'),
  controller: HeaderComponentCtrl
};