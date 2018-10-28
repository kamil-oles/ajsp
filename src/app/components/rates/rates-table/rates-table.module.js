import angular from 'angular';
import { ratesTableComponent } from './rates-table.component';
import './rates-table.scss';

export const appRatesTable = angular
  .module('appRatesTable', [])
  .component('appRatesTable', ratesTableComponent)
  .name;