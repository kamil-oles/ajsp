export const ratesCurrentComponent = {
  bindings: {
    currentRates: '<'
  },
  template: require('./rates-current.html'),
  controller: class RatesCurrentComponentController {
    constructor($scope) {
      this.scope = $scope;
    }

    $onInit() {
      // this.scope.$emit('stateChange', 'current');
    }
  }
};