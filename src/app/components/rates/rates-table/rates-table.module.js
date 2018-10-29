import angular from 'angular';
import { ratesTableComponent } from './rates-table.component';
import { RatesTableDataService } from './service/rates-table-data.service';
import './rates-table.scss';

export const appRatesTable = angular
  .module('appRatesTable', [])
  .component('appRatesTable', ratesTableComponent)
  .service('RatesTableDataService', RatesTableDataService)
  .name;