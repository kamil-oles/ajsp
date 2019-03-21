export const CONVERTER_COMPONENT = {
  bindings: {
    currencies: '<'
  },
  template: require('./converter.html'),
  controller: class ConverterComponentCtrl {
    constructor($scope) {
      this._scope = $scope;
    }

    _blockLoader = true;

    $onInit() {
      this.showRate = false;
      this._scope.$on('loader', (event, loader) => {
        this.loader = !this._blockLoader ? loader : false;
      });
    }

    updateRate(data) {
      this.rateData = data;
      this.showRate = true;
    }

    setBackdrop(data) {
      this._blockLoader = data;
    }
  }
};