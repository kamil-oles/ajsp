import { CHARTS_LINE_COMPONENT } from './charts-line.component';

export const APP_CHARTS_LINE = angular
  .module('appChartsLine', [])
  .component('appChartsLine', CHARTS_LINE_COMPONENT)
  .name;