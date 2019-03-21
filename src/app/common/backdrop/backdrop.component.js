export const BACKDROP_COMPONENT = {
  bindings: {
    addMargin: '<',
    show: '<'
  },
  template: require('./backdrop.html'),
  controller: class BackdropComponentCtrl {
    constructor($element) {
      this._bar = angular.element($element.children().children()[0]);
    }

    $onInit() {
      if (this.addMargin) {
        this._bar.addClass('backdrop-loader-container-margin');
      }
    }
  }
};