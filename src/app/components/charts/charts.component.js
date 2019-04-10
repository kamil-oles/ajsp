import { FilterConfig } from '../../common/filter/classes/filter.class';

class ChartsComponentCtrl {
  /* @ngInject */
  constructor($filter, $q, base, ChartsHttp, ComponentsDate) {
    this._baseCurrency = base.currency;
    this._filter = $filter;
    this._http = ChartsHttp;
    this._q = $q;
    this._setDate = ComponentsDate;
  }

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
  }

  getData(params) {
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
    });
  }
}

export const CHARTS_COMPONENT = {
  template: require('./charts.html'),
  controller: ChartsComponentCtrl
};