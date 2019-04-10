import 'angular-chart.js';

import { ChartsHttpService } from './services/charts-http.service';
import { CHARTS_COMPONENT } from './charts.component';

import './charts.scss';

export const APP_CHARTS = angular
  .module('appCharts', ['chart.js'])
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