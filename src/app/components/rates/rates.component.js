export const ratesComponent = {
  template: require('./rates.html'),
  controller: class RatesComponentController {
    constructor($scope) {
      this.scope = $scope;
    }

    $onInit() {
      this.scope.$on('stateChange', (event, state) => {
        this.state = state;
        event.preventDefault();
      });
    }
  }
};