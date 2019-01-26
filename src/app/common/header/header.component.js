export const HEADER_COMPONENT = {
  bindings: {
    onMenuStateChange: '&'
  },
  template: require('./header.html'),
  controller: class HeaderComponentController {
    constructor(EventEmitter) {
      this.EventEmitter = EventEmitter;
    }

    emitMenuState() {
      this.onMenuStateChange(this.EventEmitter());
    }
  }
};