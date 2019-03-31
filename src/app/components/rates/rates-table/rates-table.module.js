import { RatesTableDataService } from './services/rates-table-data.service';
import { RatesTableSortService } from './services/rates-table-sort.service';
import { RATES_TABLE_COMPONENT } from './rates-table.component';
import { RATES_TABLE_CELL_COMPONENT } from './rates-table-cell/rates-table-cell.component';
import { RATES_TABLE_HEADER_COMPONENT } from './rates-table-header/rates-table-header.component';

import './rates-table.scss';
import './rates-table-header/rates-table-header.scss';
import './rates-table-cell/rates-table-cell.scss';

export const APP_RATES_TABLE = angular
  .module('appRatesTable', [])
  .service('RatesTableData', RatesTableDataService)
  .service('RatesTableSort', RatesTableSortService)
  .component('appRatesTable', RATES_TABLE_COMPONENT)
  .component('appRatesTableCell', RATES_TABLE_CELL_COMPONENT)
  .component('appRatesTableHeader', RATES_TABLE_HEADER_COMPONENT)
  .name;