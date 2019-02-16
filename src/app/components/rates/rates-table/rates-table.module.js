import angular from 'angular';

import { RATES_TABLE_COMPONENT } from './rates-table.component';
import { RatesTableDataService } from './services/rates-table-data.service';
import { RatesTableSortService } from './services/rates-table-sort.service';

import './rates-table.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .service('RatesTableDataService', RatesTableDataService)
  .service('RatesTableSortService', RatesTableSortService)
  .name;