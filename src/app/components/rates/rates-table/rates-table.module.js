// import { RatesTableDataService } from './services/rates-table-data.service';
import { RatesTableSortService } from './services/rates-table-sort.service';
import { RATES_TABLE_COMPONENT } from './rates-table.component';

import './rates-table.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  // .service('RatesTableData', RatesTableDataService)
  .service('RatesTableSort', RatesTableSortService)
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .name;