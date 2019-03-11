export const CONVERTER_RATE_COMPONENT = {
  bindings: {
    rateData: '<',
    show: '<'
  },
  template: require('./converter-rate.html'),
  controller: class ConverterRateComponentCtrl {
    constructor($scope) {
      this._scope = $scope;
    }

    $onInit() {
      this._scope.$on('loader', (event, loader) => {
        this.loader = loader;
      });
    }
  }
};