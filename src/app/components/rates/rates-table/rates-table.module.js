import angular from 'angular';

import { RATES_TABLE_COMPONENT } from './rates-table.component';
import { RATES_TABLE_CELL_COMPONENT } from './rates-table-cell/rates-table-cell.component';
import { RATES_TABLE_HEADER_COMPONENT } from './rates-table-header/rates-table-header.component';
import { RatesTableDataService } from './services/rates-table-data.service';
import { RatesTableSortService } from './services/rates-table-sort.service';

import './rates-table.scss';
import './rates-table-header/rates-table-header.scss';
import './rates-table-cell/rates-table-cell.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .component('appRatesTableCell', RATES_TABLE_CELL_COMPONENT)
  .component('appRatesTableHeader', RATES_TABLE_HEADER_COMPONENT)
  .service('RatesTableDataService', RatesTableDataService)
  .service('RatesTableSortService', RatesTableSortService)
  // .value('EventEmitter', function (payload) {
  //   return ({ $event: payload });
  // })
  .name;