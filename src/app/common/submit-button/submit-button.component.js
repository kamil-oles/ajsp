export const SUBMIT_BUTTON_COMPONENT = {
  bindings: {
    active: '<',
    label: '<'
  },
  template: require('./submit-button.html'),
  controller: class SubmitButtonComponentCtrl {
    constructor($animate, $element, $scope) {
      this.animate = $animate;
      this.element = $element;
      this.scope = $scope;
    }

    $onInit() {
      this.scope.$on('loader', (event, loader) => {
        this.display(loader);
      });
    }

    $postLink() {
      const ELEMENTS = this.element.children().children();
      this.labelWrapper = ELEMENTS[0];
      this.loaderWrapper = ELEMENTS[1];
    }

    display(loader) {
      const HIDE = loader ? this.labelWrapper : this.loaderWrapper,
        SHOW = loader ? this.loaderWrapper : this.labelWrapper;
      this.loading = loader;
      this.animate.setClass(HIDE, 'submit-button-hide', 'submit-button-show').then(() => {
        HIDE.className += ', submit-button-hidden';
        this.animate.setClass(SHOW, 'submit-button-show', 'submit-button-hidden');
      });
    }
  }
};