import 'angular-chart.js';

import { ChartsConfigService } from './services/charts-config.service';
import { ChartsDataService } from './services/charts-data.service';
import { ChartsHttpService } from './services/charts-http.service';
import { CHARTS_COMPONENT } from './charts.component';

import './charts.scss';

export const APP_CHARTS = angular
  .module('appCharts', ['chart.js'])
  .service('ChartsConfig', ChartsConfigService)
  .service('ChartsData', ChartsDataService)
  .service('ChartsHttp', ChartsHttpService)
  .component('appCharts', CHARTS_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appCharts', {
      url: '/charts',
      component: 'appCharts',
      data: {
        title: 'Wykresy'
      }
    });
  })
  .name;