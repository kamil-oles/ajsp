class BackdropComponentCtrl {
  /* @ngInject */
  constructor($element) {
    this._bar = angular.element($element.children().children()[0]);
  }

  $onInit() {
    if (this.addMargin) {
      this._bar.addClass('backdrop-loader-container-margin');
    }
  }
}

export const BACKDROP_COMPONENT = {
  bindings: {
    addMargin: '<',
    show: '<'
  },
  template: require('./backdrop.html'),
  controller: BackdropComponentCtrl
};