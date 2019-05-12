import { ChartsLineConfigService } from './services/charts-line-config.service';
import { CHARTS_LINE_COMPONENT } from './charts-line.component';

export const APP_CHARTS_LINE = angular
  .module('appChartsLine', [])
  .service('ChartsLineConfig', ChartsLineConfigService)
  .component('appChartsLine', CHARTS_LINE_COMPONENT)
  .name;