import { FilterConfig } from '../../common/filter/classes/filter.class';

class ChartsComponentCtrl {
  /* @ngInject */
  constructor($filter, $q, $scope, base, ChartsHttp, ComponentsDate) {
    this._baseCurrency = base.currency;
    this._filter = $filter;
    this._http = ChartsHttp;
    this._scope = $scope;
    this._q = $q;
    this._setDate = ComponentsDate;
  }

  _blockLoader = true;

  datasetOverride = [
    {
      borderColor: 'rgb(158, 158, 158)',
      fill: false,
      lineTension: 0,
      pointBackgroundColor: 'rgb(238, 255, 65)',
      pointBorderColor: 'rgb(158, 158, 158)'
    }
  ]
  options = {
    legend: {
      labels: {
        fontColor: 'yellow'
      }
    }
  }

  $onInit() {
    this.filterConfig = new FilterConfig(
      this._baseCurrency,
      this._setDate.setDateFrom(14),
      'POKAŻ',
      true
    );
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._blockLoader ? loader : false);
    });
  }

  getData(params) {
    this._blockLoader = false;
    const PROMISES = [];
    this._params = angular.copy(params);
    this._params.currencies.forEach(element => {
      PROMISES.push(this._http.getRates(element.code, this._params.from, this._params.to));
    });
    this._q.all(PROMISES).then(response => {
      this.data = [[], []];
      this.labels = [];
      response.forEach((element, index) => {
        element.data.rates.forEach(el => {
          this.data[index].push(el.ask);
          if (!index) {
            this.labels.push(this._filter('date')(el.effectiveDate, 'dd.MM.yyyy'));
          }
        });
      });
      this._blockLoader = true;
    }, error => {
      this._scope.$emit('toast', error.data);
      this._blockLoader = true;
    });
  }
}

export const CHARTS_COMPONENT = {
  template: require('./charts.html'),
  controller: ChartsComponentCtrl
};