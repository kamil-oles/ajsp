export const HEADER_COMPONENT = {
  bindings: {
    onUiStateChange: '&'
  },
  template: require('./header.html'),
  controller: class HeaderComponentController {
    constructor(EventEmitter) {
      this.EventEmitter = EventEmitter;
    }

    emitChange() {
      this.onUiStateChange(this.EventEmitter());
    }
  }
};