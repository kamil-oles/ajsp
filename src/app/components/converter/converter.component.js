class ConverterComponentCtrl {
  /* @ngInject */
  constructor($scope) {
    this._scope = $scope;
  }

  showRate = false;
  _blockLoader = true;

  $onInit() {
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._blockLoader ? loader : false);
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

export const CONVERTER_COMPONENT = {
  template: require('./converter.html'),
  controller: ConverterComponentCtrl
};