import { CHARTS_LEGEND_COMPONENT } from './charts-legend.component';

import './charts-legend.scss';

export const APP_CHARTS_LEGEND = angular
  .module('appChartsLegend', [])
  .component('appChartsLegend', CHARTS_LEGEND_COMPONENT)
  .name;