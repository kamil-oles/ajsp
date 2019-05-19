class BackdropComponentCtrl {
  /* @ngInject */
  constructor($element) {
    this._element = $element;
  }

  $postLink() {
    if (this.addMargin) {
      const BAR = angular.element(this._element.children().children()[0]);
      BAR.addClass('backdrop-loader-container-margin');
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