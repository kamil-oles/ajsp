import { APP_CHARTS_LEGEND } from './charts-legend/charts-legend.module';
import { APP_CHARTS_LINE } from './charts-line/charts-line.module';
import { ChartsDataService } from './services/charts-data.service';
import { ChartsHttpService } from './services/charts-http.service';
import { CHARTS_COMPONENT } from './charts.component';

import './charts.scss';

export const APP_CHARTS = angular
  .module('appCharts', [APP_CHARTS_LEGEND, APP_CHARTS_LINE])
  .service('ChartsData', ChartsDataService)
  .service('ChartsHttp', ChartsHttpService)
  .component('appCharts', CHARTS_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appCharts', {
      url: '/charts',
      component: 'appCharts',
      data: { title: 'Wykresy' }
    });
  })
  .name;