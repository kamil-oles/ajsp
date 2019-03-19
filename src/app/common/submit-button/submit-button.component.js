export const SUBMIT_BUTTON_COMPONENT = {
  bindings: {
    active: '<',
    label: '<',
    showLoader: '<'
  },
  template: require('./submit-button.html'),
  controller: class SubmitButtonComponentCtrl {
    constructor($animate, $element, $scope) {
      this._animate = $animate;
      this._element = $element;
      this._scope = $scope;
    }

    $onInit() {
      this._scope.$on('loader', (event, loader) => {
        if (this.showLoader) {
          this._display(loader);
        }
      });
    }

    $postLink() {
      const ELEMENTS = this._element.children().children();
      this.labelWrapper = ELEMENTS[0];
      this.loaderWrapper = ELEMENTS[1];
    }

    _display(loader) {
      const HIDE = loader ? this.labelWrapper : this.loaderWrapper,
        SHOW = loader ? this.loaderWrapper : this.labelWrapper;
      this.loading = loader;
      this._animate.setClass(HIDE, 'submit-button-hide', 'submit-button-show').then(() => {
        HIDE.className += ', submit-button-hidden';
        this._animate.setClass(SHOW, 'submit-button-show', 'submit-button-hidden');
      });
    }
  }
};