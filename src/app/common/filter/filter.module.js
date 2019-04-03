import { FILTER_COMPONENT } from './filter.component';

import './filter.scss';

export const APP_FILTER = angular
  .module('appFilter', [])
  .component('appFilter', FILTER_COMPONENT)
  .name;