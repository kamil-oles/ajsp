import { FilterConfig } from '../../../common/filter/classes/filter.class';
import { RatesHistorical } from './classes/rates-historical.class';

class RatesHistoricalComponentCtrl {
  /* @ngInject */
  constructor($scope, headers, RatesHistoricalHttp) {
    this.headers = headers.historical;
    this._http = RatesHistoricalHttp;
    this._scope = $scope;
  }

  blockLoader = true;

  $onInit() {
    this.rates = this.initData.data ? this.initData.data.rates : null;
    this.filterConfig = new FilterConfig(this.initData.currency, this.initData.from, 'FILTRUJ');
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this.blockLoader ? loader : false);
    });
  }

  getData(params) {
    this.blockLoader = false;
    const START = params.from,
      END = params.to;
    this._http.getRates(params.currencies[0].code, START, END).then(
      response => {
        const DATA = response.data;
        sessionStorage.setItem(
          'rates_historical',
          JSON.stringify(new RatesHistorical(DATA.code, START, END))
        );
        this.rates = DATA.rates;
        this.blockLoader = true;
      },
      error => {
        this._scope.$emit('toast', error.data);
        this.blockLoader = true;
      }
    );
  }
}

export const RATES_HISTORICAL_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-historical.html'),
  controller: RatesHistoricalComponentCtrl
};