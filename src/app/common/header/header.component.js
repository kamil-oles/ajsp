export const HEADER_COMPONENT = {
  bindings: {
    onViewStateChange: '&'
  },
  template: require('./header.html'),
  controller: class HeaderComponentCtrl {
    constructor(EventEmitter) {
      this.EventEmitter = EventEmitter;
    }

    repo = 'https://github.com/kamil-oles/Currency_converter-AngularJS';

    emitChange() {
      this.onViewStateChange(this.EventEmitter());
    }
  }
};