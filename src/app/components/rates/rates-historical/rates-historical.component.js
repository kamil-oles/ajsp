import differenceby from 'lodash.differenceby';

import * as columns from '../../../data/tables.json';
import { FilterConfig, FilterParams } from '../../../common/filter/classes/filter.class';
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
    if (this.rates) {
      this._currentParams = new FilterParams(
        [{ code: this.initData.currency }, { code: null }],
        this.initData.from,
        this.initData.to
      );
    }
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
    let currenciesDiff = [],
      datesDiff = true;
    if (this._currentParams) {
      currenciesDiff = differenceby(this._currentParams.currencies, params.currencies, 'code');
      datesDiff = this._data.datesDiff(this._currentParams, params);
    }
    if (currenciesDiff.length > 0 || datesDiff) {
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
          console.log(error);
          this._scope.$emit('toast', error);
          this._blockLoader = true;
        }
      );
      this._currentParams = angular.copy(params);
    }
  }
}

export const RATES_HISTORICAL_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-historical.html'),
  controller: RatesHistoricalComponentCtrl
};