import angular from 'angular';

import { RATES_TABLE_COMPONENT } from './rates-table.component';
import { RATES_TABLE_HEADER_COMPONENT } from './rates-table-header/rates-table-header.component';
import { RatesTableDataService } from './services/rates-table-data.service';
import { RatesTableSortService } from './services/rates-table-sort.service';

import './rates-table.scss';
import './rates-table-header/rates-table-header.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .component('appRatesTableHeader', RATES_TABLE_HEADER_COMPONENT)
  .service('RatesTableDataService', RatesTableDataService)
  .service('RatesTableSortService', RatesTableSortService)
  .name;