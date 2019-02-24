export const SUBMIT_BUTTON_COMPONENT = {
  bindings: {
    active: '<',
  },
  template: require('./submit-button.html'),
  controller: class SubmitButtonComponentCtrl {
    constructor($scope) {
      this.scope = $scope;
    }

    loading = false;

    $onInit() {
      this.scope.$on('loader', (event, loader) => {
        this.loading = loader;
      });
    }
  }
};