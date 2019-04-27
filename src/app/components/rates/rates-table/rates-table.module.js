import { RatesTableColorDirective } from './directives/rates-table-color.directive';
import { RatesTableSortService } from './services/rates-table-sort.service';
import { RATES_TABLE_COMPONENT } from './rates-table.component';

import './rates-table.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  .service('RatesTableSort', RatesTableSortService)
  .directive('ratesTableColor', RatesTableColorDirective)
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .name;