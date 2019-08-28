class ChartsComponentCtrl {
  /* @ngInject */
  constructor($scope, base, ChartsData, CommonDate, CommonFilterData) {
    this._baseCurrency = base.currency;
    this._data = ChartsData;
    this._date = CommonDate;
    this._filterData = CommonFilterData;
    this._scope = $scope;
  }

  data = [[], []];
  labels = [];
  _blockLoader = true;

  $onInit() {
    this.filterConfig = this._filterData.filterConfig(
      this._baseCurrency,
      this._date.setDateFrom(14),
      new Date(),
      'POKAŻ',
      true
    );
    this.params = this._filterData.filterParams(
      [{ code: this._baseCurrency }, { code: null }],
      null,
      null
    );
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._blockLoader ? loader : false);
    });
  }

  getData(params) {
    this._blockLoader = false;
    this._data.prepareData(this.params, params, this.data, this.labels).then(
      response => {
        this._setState(response);
      },
      error => {
        this._setState(error);
      });
  }

  _setState(response) {
    this.data = angular.copy(response.data);
    this.labels = response.labels;
    this.params = angular.copy(response.params);
    this._blockLoader = true;
    if (response.error) {
      this._scope.$emit('toast', response.error);
    }
  }
}

export const CHARTS_COMPONENT = {
  template: require('./charts.html'),
  controller: ChartsComponentCtrl
};