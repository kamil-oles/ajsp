import * as columns from '../../../data/tables.json';
import { FilterConfig } from '../../../common/filter/classes/filter.class';
import { RatesHistorical } from './classes/rates-historical.class';

class RatesHistoricalComponentCtrl {
  /* @ngInject */
  constructor($scope, RatesHistoricalData, headers, RatesHistoricalHttp) {
    this.headers = headers.historical;
    this._data = RatesHistoricalData;
    this._http = RatesHistoricalHttp;
    this._scope = $scope;
  }

  _blockLoader = true;

  $onInit() {
    this.rates = this.initData.rates || null;
    this.filterConfig = new FilterConfig(
      this.initData.currency,
      this.initData.from,
      this.initData.to,
      'FILTRUJ'
    );
    this.columns = angular.copy(columns.data.historical);
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._blockLoader ? loader : false);
    });
  }

  getData(params) {
    this._blockLoader = false;
    const CODE = params.currencies[0].code,
      START = params.from,
      END = params.to;
    this._http.getRates(CODE, START, END).then(
      response => {
        this.rates = this._data.prepare(response.data.rates);
        this._data.save(new RatesHistorical(CODE, START, END, this.rates));
        this._blockLoader = true;
      },
      error => {
        this._scope.$emit('toast', error.data);
        this._blockLoader = true;
      }
    );
  }
}

export const RATES_HISTORICAL_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-historical.html'),
  controller: RatesHistoricalComponentCtrl
};