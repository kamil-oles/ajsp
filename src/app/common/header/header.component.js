import * as packages from '../../../../package.json';

class HeaderComponentCtrl {
  /* @ngInject */
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
  }

  $onInit() {
    this.repo = packages.repository.url;
  }

  emitChange() {
    this.onViewChange(this._eventEmitter());
  }
}

export const HEADER_COMPONENT = {
  bindings: { onViewChange: '&' },
  template: require('./header.html'),
  controller: HeaderComponentCtrl
};