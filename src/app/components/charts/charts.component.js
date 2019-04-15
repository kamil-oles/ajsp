import { FilterConfig, FilterParams } from '../../common/filter/classes/filter.class';

class ChartsComponentCtrl {
  /* @ngInject */
  constructor($scope, base, ChartsConfig, ChartsData, ComponentsDate) {
    this._baseCurrency = base.currency;
    this._config = ChartsConfig;
    this._data = ChartsData;
    this._scope = $scope;
    this._setDate = ComponentsDate;
  }

  data = [[], []];
  labels = [];
  _blockLoader = true;

  $onInit() {
    this.filterConfig = new FilterConfig(
      this._baseCurrency,
      this._setDate.setDateFrom(14),
      'POKAŻ',
      true
    );
    this.datasetOverride = this._config.dataset();
    this.options = this._config.options();
    this._params = new FilterParams([{ code: this._baseCurrency }, { code: null }], null, null);
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._blockLoader ? loader : false);
    });
  }

  getData(params) {
    this._blockLoader = false;
    this._data.prepareData(this._params, params, this.data, this.labels).then(response => {
      this._setState(response);
    }, error => {
      this._setState(error);
    });
  }

  _setState(response) {
    this.data = response.data;
    this.labels = response.labels;
    this._params = angular.copy(response.params);
    this._blockLoader = true;
    if (response.error) {
      const ERROR = response.error;
      this._scope.$emit('toast', ERROR.data);
    }
  }
}

export const CHARTS_COMPONENT = {
  template: require('./charts.html'),
  controller: ChartsComponentCtrl
};