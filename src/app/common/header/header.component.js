export const HEADER_COMPONENT = {
  bindings: {
    onViewStateChange: '&'
  },
  template: require('./header.html'),
  controller: class HeaderComponentCtrl {
    constructor(eventEmitter) {
      this.eventEmitter = eventEmitter;
    }

    repo = 'https://github.com/kamil-oles/Currency_converter-AngularJS';

    emitChange() {
      this.onViewStateChange(this.eventEmitter());
    }
  }
};