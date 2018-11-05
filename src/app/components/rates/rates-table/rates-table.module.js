import angular from 'angular';
import { ratesTableComponent } from './rates-table.component';
import { RatesTableDataService } from './service/rates-table-data.service';
import { RatesTableHeadersService } from './service/rates-table-headers.service';
import { RatesTableSortService } from './service/rates-table-sort.service';
import './rates-table.scss';

export const appRatesTable = angular
  .module('appRatesTable', [])
  .component('appRatesTable', ratesTableComponent)
  .service('RatesTableDataService', RatesTableDataService)
  .service('RatesTableHeadersService', RatesTableHeadersService)
  .service('RatesTableSortService', RatesTableSortService)
  .name;